import React from 'react'
import styled from 'styled-components'
import Link from '../components/styles/Link'

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Pagination = ({ numPages }) => (
  <StyledPagination>
    <Link to="/places">Places</Link>
    {Array.from({ length: numPages - 1 }).map((_, i) => {
      return (
        <p>
          <Link to={`/${i + 1}`}>{i + 1}</Link>
        </p>
      )
    })}
    <Link to="/">Dates</Link>
  </StyledPagination>
)

export default Pagination
