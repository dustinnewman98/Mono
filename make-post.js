const config = require('./config.json')

const mkdirp = require('mkdirp')
const fs = require('fs')
const readline = require('readline')

const slugify = require('slug')
const { google } = require('googleapis')

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = 'credentials.json'

const DUMP = config.postdir + '/READFROMME.html'

// Load client secrets from a local file.
// Script starts here
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file: ', err)
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), writeFiles)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

/**
 * Download files from blog folder
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function writeFiles(auth) {
  const drive = google.drive({
    version: config.google.version,
    auth,
  })

  //Do NOT remove the single quotes, google is fucking Annoying
  drive.files.list(
    {
      q: `'${config.google.folder}' in parents`,
    },
    (err, { data }) => {
      if (data.files.length) {
        console.log('Children Found:')
        data.files.map(file => {
          console.log(file.name)

          const dest = fs.createWriteStream(DUMP)

          drive.files.export(
            {
              fileId: file.id,
              mimeType: 'text/html',
            },
            {
              responseType: 'stream',
            },
            (err, res) => {
              if (err) throw err

              res.data
                .on('end', () => {
                  makePost()
                })
                .on('error', err => {
                  console.log('Error retrieving stream from Google Drive')
                  throw err
                })
                .pipe(dest)
            }
          )
        })
      } else {
        console.log('Folder is empty!')
      }
    }
  )
}

function parseDump() {
  return fs
    .readFileSync(DUMP, 'utf8')
    .replace(/<\/span>[^\/span]*<span style="font-weight:700">(.*?)<\/span>/gi,
      (match, $1) => {
        return '**' + $1 + '**</span>'
      }
    )
    .replace(/<span style="font-style:italic">(.*?)<\/span>/gi, (match, $2) => {
      return '__' + $2 + '__'
    })
    .replace(/style="[^\"]*"/gi, '')
    .replace(/<(?!\/?p|img|a(?=>|\s.*>))\/?.*?>/gi, '')
}

function makePost() {
  let content = parseDump();
  const date = new Date();
  let title, subtitle;
  content = content
    .replace(/<p[^>]*class="title"[^>]*>(.*?)<\/p>/gi, (match, $1) => {
      title = $1
      return ''
    })
    .replace(/<p[^>]*class="subtitle"[^>]*>(.*?)<\/p>/gi, (match, $2) => {
      subtitle = $2
      return ''
    })
    .replace(/<p[^>]*>/gi, '').replace(/<\/p[^>]*>/gi, '\n');

  const slug = slugify(title)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const filename = __dirname + `/posts/${year}-${month}-${day}-${slug}.md`
  const frontmatter = `---\ntitle: "${title}"\nsubtitle: "${subtitle}"\ndate: "${date.toISOString()}"\npath: "/posts/${year}/${month}/${day}/${slug}"\n---\n\n${content}`

  mkdirp('posts', function (err) {
    if (err) return printResult(err)

    fs.writeFile(filename, frontmatter, printResult)
  })

  const printResult = err => {
    if (err) throw err
    console.log('Done! Created ' + filename)
  }
}
