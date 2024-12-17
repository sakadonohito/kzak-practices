import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Footer from '../components/footer'

import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDesktop, faMobileAlt, faLink } from "@fortawesome/free-solid-svg-icons"

import * as Css from './index.module.css'

const IndexPage = ({data}) => {
  return (
    <Layout pageTitle="TOP Page" topFlag={true}>
      <Seo />
      <div className={Css.container}>
	{
	  data.allMdx.nodes.map( node => {
	    //console.log(node.frontmatter);
	    const tags = node.frontmatter.tags
            const pc_image = getImage(node.frontmatter.pc_image_display) || undefined
            //const sp_image = getImage(node.frontmatter.sp_image) || undefined
            return (
	      <article key={node.id} className={Css.articleContainer}>
	        <div>
                  <GatsbyImage image={pc_image} alt={node.frontmatter.pc_image_display_alt} className={Css.imageContainer}/>
                  <div className={Css.articleBottomTextContainer}>
                    <div>
			<p>{node.frontmatter.title}</p>
			<p>{node.frontmatter.date}</p>
                    </div>
                    <div>
			<p className={Css.textRight}>
                            {tags.includes('pc') && <Link to={`pc/${node.slug}`}><FontAwesomeIcon icon={faDesktop}/></Link>}
                            {tags.includes('sp') && <Link to={`sp/${node.slug}`}><FontAwesomeIcon icon={faMobileAlt}/></Link>}
			    {node.frontmatter.product_url && (<a href={node.frontmatter.product_url} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLink}/></a>)}
			</p>
                    </div>
                  </div>
	        </div>
	      </article>
            )
	  })
	}
      </div>
      <Footer/>
    </Layout>
  )
}

export const query = graphql`
query {
  allMdx (
    filter: {slug: {ne: "about/"}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    nodes {
      frontmatter {
        date
        title
        pc_image_display {
          childImageSharp {
            gatsbyImageData
          }
        }
        pc_image_display_alt
        product_url
        tags
      }
      id
      slug
    }
  }
}

`

export default IndexPage
