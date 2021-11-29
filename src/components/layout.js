import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
//import * as Css from './layout.module.css'

const Layout = ({ pageTitle, topFlag, children}) => {
    const data = useStaticQuery(graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
}`)

    return (
	<div>
	    <title>{pageTitle} | {data.site.siteMetadata.title}</title>
	    <Header top={topFlag}/>

	    <main>
		{children}
	    </main>

	</div>
    )
}

export default Layout

/*
	    <nav>navi</nav>
	    <footer>footer</footer>
*/
