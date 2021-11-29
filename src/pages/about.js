import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import * as Css from './about.module.css'

const AboutPage = ({data}) => {
  return (
    <Layout pageTitle="About Me">
      <article className={Css.article}>
        <MDXRenderer>
	  {data.mdx.body}
        </MDXRenderer>
      </article>
      <div className={"back-to-top-container"}>
        <Link to={'/'}>TOPページに戻る</Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
query  {
  mdx(slug: {eq: "about/"}) {
    frontmatter {
      title
    }
    body
    slug
  }
}
`

export default AboutPage
