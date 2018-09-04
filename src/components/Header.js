import React from 'react'
// import { Link } from 'gatsby'
import { Toolbar, Caps, Link } from 'rebass'
import styled from 'styled-components'

const StyledToolbar = styled(Toolbar)`
  background: linear-gradient(to right, #e7d2b3, #81816e);
  opacity: 0.4;
`

const Header = ({ siteTitle }) => (
  <StyledToolbar bg="#9A9588" justifyContent="center">
    <Link color="black">
      <Caps>{siteTitle}</Caps>
    </Link>
  </StyledToolbar>
)

export default Header
