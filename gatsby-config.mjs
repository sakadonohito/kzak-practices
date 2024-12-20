import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  siteMetadata: {
    siteUrl: "https://portfolio.k-zak.com",
    title: "kzak's practice gallery",
    description: "kzak's Portfolio site",
    image: "/ogp_image.png"
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-H4KSQGVRRZ",
          "UA-213835505-1"
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    'gatsby-plugin-sitemap',
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
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    //よくわかんない追加
/*
    {
      resolve: "gatsby-source-filesystem",
      options: {
	name: 'images',
	path: "./src/images/"
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
	name: 'pages',
	path: "./src/pages/"
      },
      __key: "pages",
    },
*/
    //ここまで
    {
      resolve: "gatsby-source-filesystem",
      options: {
	name: 'posts',
	path: `${__dirname}/posts`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`], // 拡張子を設定
        mdxOptions: {
          remarkPlugins: [

          ],                         // markdown処理用プラグイン
          rehypePlugins: [],         // HTML処理用プラグイン
        },
        defaultLayouts: {},
        degug: false,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: "https://portfolio.k-zak.com",
        stripQueryString: true
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: "https://portfolio.k-zak.com",
        sitemap: "https://portfolio.k-zak.com/sitemap.xml"
      }
    },
  ]
};


/*
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
          }
        }
      }
    `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/posts" + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + "/posts" + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
          {
            allMdx(
              sort: { order: DESC, fields: [frontmatter___date] },
            ) {
              edges {
                node {
                  excerpt
                  html
                  fields { 
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          }
        `,
            output: "/rss.xml",
            title: `${siteName}`,
            match: "^/posts/"
          },
        ],
      },
    },
*/

export default config;
