import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'

import Link from '../components/styles/Link'

const StyledNavigation = styled.div`
  ${space};
  display: flex;
  justify-content: center;
`

const Navigation = () => (
  <StyledNavigation mt={[4]}>
    <Link to="/">
      <h4>Photo Journal</h4>
    </Link>
  </StyledNavigation>
)

export default Navigation
