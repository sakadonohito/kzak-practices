import * as React from 'react'
import PropTypes from 'prop-types'
//import * from 'gatsby'
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from 'gatsby'
import ogpImage from '../pages/static_images/ogp_image.png'

//const Seo = ({ title, description, lang = 'ja', article = false }) => {
const Seo = ({ title, description, ogpImgPath, article = false, children }) => {
  const { pathname } = useLocation()
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          image
          defaultTitle: title
          defaultDescription: description
        }
      }
    }
  `)
  const metaTitle = title || data.site.siteMetadata.defaultTitle
  const metaDescription = description || data.site.siteMetadata.defaultDescription
  const pageTitle = title? title: 'TOP page'
  //console.log(article)
  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:site_name" content={data.site.siteMetadata.defaultTitle} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={`${data.site.siteMetadata.siteUrl}${pathname}`} />
      <meta property="og:image" content={`${data.site.siteMetadata.siteUrl}${ogpImage}`} />
      <meta property="og:type" content={article? 'article':'website'} />

      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </>
  )
}

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false
}
/*
        //htmlAttributes={{lang}} 
      //title={metaTitle}
      //<head prefix="og: http://ogp.me/ns#" />
      */
