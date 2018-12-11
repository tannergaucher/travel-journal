import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Container from '../components/styles/Container'
import kebabCase from 'lodash/kebabCase'
import Link from '../components/styles/Link'

const Places = ({ data }) => {
  const { group } = data.allImageSharp
  return (
    <Layout>
      <Container>
        <p>Places</p>
        <ul>
          {group.map(country => {
            console.log(country)
            const name = country.fieldValue
            const count = country.totalCount
            return (
              <li>
                <Link to={`/countries/${kebabCase(name)}`}>
                  {name}:{count}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export default Places

export const countriesQuery = graphql`
  query {
    allImageSharp {
      group(field: fields___country) {
        fieldValue
        totalCount
      }
    }
  }
`
