import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { injectGlobal } from 'styled-components'

import Header from './Header'
import Footer from './Footer'

injectGlobal`
* { box-sizing: border-box; }
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
html { font-family: 'Roboto Mono', monospace;}
body { 
  margin: 0;
  background: #fafafa;
   }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        {children}
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
