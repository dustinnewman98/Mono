# ⚫️ ⚪️ Mono Theme Website ⚪️ ⚫️

This is my personal website built largely with [Gatsby](https://www.gatsbyjs.org).

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/), or right below!.

## Structure

```
.
├── LICENSE                   where i show my love for free software/GNU
├── Makefile                  where you install, build, deploy, or make posts!
├── README.md                 this file!
├── client_secret.json        google drive api keys and stuff
├── config.json               i use this so i can publish my makefile on github!
├── credentials.json          basically like a cache for my google drive requests
├── gatsby-browser.js         i don't use this yet
├── gatsby-config.js          where i get my site description and make my plugins work
├── gatsby-node.js            the file that actually uses the markdown files in posts/
├── gatsby-ssr.js             don't use this either
├── make-post.js              the script that gets my posts from google drive
├── package-lock.json         auto-generated by npm
├── package.json              define my dependencies and things
├── posts                     where all the markdown files are stored!
├── src                       the actual 'meat' of the website
│   ├── assets                for my fonts and front page image
│   ├── components            all the components u see on this site
│   ├── layouts               wrapper "master" layout for entire site
│   ├── pages                 basically templates for each page (about, projects, posts, etc.)    
│   ├── styles                where all the SASS/scss lives
│   ├── templates             template for how the posts look
│   └── utils                 handy little function to get my SEO info so twitter and fb posts look good
└── yarn.lock                 auto-generated by yarn
```

## Gatsby Install

Make sure that you have the Gatsby CLI program installed:
```sh
npm install --global gatsby-cli
```

And run from your CLI:
```sh
gatsby new gatsby-example-site
```

Then you can run it by:
```sh
cd gatsby-example-site
gatsby develop
```

## Mono Install

The above instructions were auto-generated by Gatsby and I leave them here only in the interest of other people wanting to start new and not modify this existing repo.

However, if you are going that route, then these are **my** installation instructions.

In Terminal, type:
```sh
make install
make build
make develop
```

`make install` just runs `npm install`, `make build` just runs `gatsby build`, and `make develop` just runs `gatsby develop`, so the difference is really just that "make" is shorter than "gatsby". 

When you run `make develop` or `gatsby develop` if you just have to do it the difficult way, then the app will be running at [localhost:5000](localhost:5000).

However, the `Makefile` does contain two non-trivial functions, which are `make post` and `make deploy`, so for those it's definitely easier for you to just run them.

### Make Post
Running `make post` will execute the file `./make-post.js` in [Node.js](https://nodejs.org/). That file uses the [Google API](https://github.com/google/google-api-nodejs-client) to have access to the folder that I use to write all my blog posts. Basically, how it works is:
1. It gets the folder ID from the `config.json` file, which looks something like this:
```
{
  "google": {
    "folder": "folderID",
    "version": "v3"
  }
}
```
2. With that folder, it gets all the files inside that folder
3. For each file, it reads the contents and parses it (see [here](#writing-a-post) for how to correctly write the post in Google Docs)
4. After parsing, it generates a markdown (`.md`) file in the `./posts/` directory.
5. The `gatsby-node.js` file then goes through the `./posts/` directory and creates a page for every post using the template found in [`./src/templates/post.js`](./src/templates/post.js)
6. You can find every post under `localhost:5000/posts`!

## Writing A Post
I write all my posts in one folder on my Google Drive. This folder has a URL of something like:
`https://drive.google.com/drive/u/0/folders/FOLDER-ID`
Just get that folder ID and put it in your `config.json` where the app can access it. 

To make a post, make a new document in that folder. To define the title, use Google's option for setting the "text style" and change it from the default "Normal" to "Title." To make the subtitle, do the same thing, but choose the style "Subtitle."

To embed images inside your posts, simply drag the image into the Google doc where you want it and leave the rest to the parser.

To bold or italicize text, just bold **OR** italicize the next as you would normally. I emphasize that "or" to signify that it is an EXCLUSIVE or: meaning, currently, the parser doesn't support both and doing so will lead to *gasp* Undefined Behavior.

To use links, simply make the link as you would normally. 

The date for each post is the date that you run the `make post` script, *not* the date you write the Google doc.

## Deployment

To deploy, set up your `config.json` file with the keys "server" and "path" so that it looks somewhat like this:
```
{
  "server": "username@IPAddressForServer",
  "path": "WhereYourHostingServicePullsFrom"
  ...
}
```
When you run `make deploy`, the Makefile will use the [jq Linux utility](https://stedolan.github.io/jq/) to get the values of the keys "server" and "path" (so the naming here is important unless you change the Makefile) and use them to `scp` (secure copy) the tar file it generates onto the server.
From there, it will use the server and path again to login to the server using `ssh` (secure shell) and expand the tar file.
Note that you have to manually type in your password both times every time you want to deploy. 
If you'd rather automate it, you can use [sshpass](https://linux.die.net/man/1/sshpass) or [ssh-keygen](https://www.ssh.com/ssh/keygen/) to do so.