import * as React from 'react'
import { Link, graphql } from 'gatsby'
//import { MDXRenderer } from 'gatsby-plugin-mdx'
//import * from 'gatsby-plugin-mdx'
//import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/layout'
import Seo from '../components/seo'
import * as Css from './about.module.css'

const AboutPage = ({data: {mdx}, children}) => {
  //const { body } = data.mdx;
  //console.log(data)
  return (
    <Layout pageTitle="About Me">
      <Seo title="aboutページ" description="ABOUR ME" />
      <article className={Css.article}>

        {children}

      </article>
      <div className={"back-to-top-container"}>
        <Link to={'/'}>TOPページに戻る</Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`

export default AboutPage
