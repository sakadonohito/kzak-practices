module.exports = {
  siteMetadata: {
    siteUrl: "https://portfolio.k-zak.com",
    title: "kzak's practice gallery",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
	name: 'posts',
	path: `${__dirname}/posts`
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "kzak's practice gallery",
        short_name: "Portfolio",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: "src/images/favicon-32x32.png", 
        crossOrigin: `use-credentials`
      }
    }
  ]
};
