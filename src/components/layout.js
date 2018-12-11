import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { injectGlobal, ThemeProvider } from 'styled-components'

import Navigation from './Navigation'

injectGlobal`
* { box-sizing: border-box; }
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300');
html { font-family: 'Roboto Mono', monospace;}
body { 
  margin: 0;
   }
`

const theme = {
  primaryText: 'black',
  href: 'grey',
}

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
      <ThemeProvider theme={theme}>
        <>
          <Navigation />
          {children}
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
