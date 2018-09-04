import React from 'react'
import { Toolbar, Link } from 'rebass'

const string = '</src>'

const Footer = ({ siteTitle }) => (
  <Toolbar bg="#fafafa" justifyContent="center">
    <Link color="black" to="/git">
      {string}
    </Link>
  </Toolbar>
)

export default Footer
