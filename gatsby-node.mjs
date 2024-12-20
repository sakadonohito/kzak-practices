import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

export const onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'slug',
      value: createFilePath({ node, getNode })
    });
  }
};

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Mdx implements Node {
      fields: Fields
    }

    type Fields {
      slug: String
    }
  `);
};

export const createPages = async ({ graphql, actions }) => {
  //console.log("CreatePages called!")
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error("Failed to fetch MDX data");
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    if (node.fields.slug === "/about/") {
      // About ページの生成
      createPage({
        path: `/aboutus/`,
        component: `${path.resolve("./src/templates/about.js")}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, frontmatter: node.frontmatter },
      });
    } else {
      // その他のページ生成（PC/SP）

      createPage({
        path: `/pc${node.fields.slug}`,
        component: `${path.resolve("./src/templates/pc/{mdx.fields__slug}.js")}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, frontmatter: node.frontmatter },
      });

      createPage({
        path: `/sp${node.fields.slug}`,
        component: `${path.resolve("./src/templates/sp/{mdx.fields__slug}.js")}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, frontmatter: node.frontmatter },
      });
    }
  });
};

//export const onCreatePage = (page, actions) => {
//  //console.log(actions);
//  //const {deletePage} = actions;
//  //console.log("onCreatePage: ", page.page);
//  // 余計なページ(mdxファイルを使った標準仕様自動作成)
//  if (page.page.componentPath.includes(".mdx") && !page.page.componentPath.includes("contentFilePath")) {
//    //console.log("Debug: ", true);
//    //console.log("Available actions:", Object.keys(actions));
//    //deletePage(page);
//    //console.log("Deleted!");
//  } 
//  if(page.page.path === '/about/') {
//    console.log("これ！", page.page)
//    console.log("Available actions:", Object.keys(actions));
//    console.log(actions.plugins);
//  }
//};

