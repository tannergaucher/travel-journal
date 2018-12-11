import styled from 'styled-components'
import Link from 'gatsby-link'
import { space } from 'styled-system'

const MyLink = styled(Link)`
  ${space};
  color: ${props => props.theme.href};
  text-decoration: none;
`

export default MyLink
