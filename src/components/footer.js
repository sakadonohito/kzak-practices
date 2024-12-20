import * as React from 'react'
import { Link } from 'gatsby'
import * as Css from './footer.module.css'

const Footer = () => {
  return (
    <footer className={Css.footer}>
      <ul>
        <li>
	  <Link to="aboutus">ABOUT</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
