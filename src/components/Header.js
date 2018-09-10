import React from 'react'
// import { Link } from 'gatsby'
import { Toolbar, Caps, Link } from 'rebass'
import styled from 'styled-components'

const StyledToolbar = styled(Toolbar)`
  /* background: linear-gradient(to right, #e7d2b3, #81816e); */
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const Header = ({ siteTitle }) => (
  <StyledToolbar bg="#9A9588" justifyContent="center">
    <Link color="black">
      <Caps>{siteTitle}</Caps>
    </Link>
  </StyledToolbar>
)

export default Header
