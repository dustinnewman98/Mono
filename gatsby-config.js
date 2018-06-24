module.exports = {
    siteMetadata: {
        title: 'DUSTIN NEWMAN',
        description: 'LA-based web and iOS developer (will work for chai lattes).',
    },
    plugins: ['gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/posts`,
                name: 'posts'
            }
        },
        'gatsby-transformer-remark'],
}
