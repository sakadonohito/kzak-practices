import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as Css from './header.module.css'

const Header = ({ pageTitle, top, children}) => {
  const data = useStaticQuery(graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
}`)

  return (
    <header className={Css.siteHeader}>
      <div>
	<h1><Link to="/">{data.site.siteMetadata.title}</Link></h1>
	{top && <p>Webサイト制作のポートフォリオ</p>}
      </div>
      {top &&
       <div>
       </div>
      }
    </header>
  )
}

export default Header

/*

		 <form id="search" action="/" method="get">
		     <input id="search_box" name="search_box" type="text"/>
		     <button type="submit" id="search_button">
			 <i>a</i>
		     </button>
		 </form>

*/
