import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { injectGlobal, ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import Navigation from './Navigation'
import { theme } from '../theme'

injectGlobal`
* { box-sizing: border-box; }
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300');
html { font-family: 'Roboto Mono', monospace;}
body { 
  margin: 0;
  color: ${theme.primaryText};
  
   }
`

const Inner = styled.div`
  display: flex;
  justify-content: center;
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
      <ThemeProvider theme={theme}>
        <>
          <Navigation />
          <Inner>{children}</Inner>
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
