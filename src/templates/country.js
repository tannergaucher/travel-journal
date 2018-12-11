import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/layout'
import Container from '../components/styles/Container'
import Link from '../components/styles/Link'

const Wrapper = styled.div`
  width: 600px;
`

const Country = ({ data, pageContext }) => {
  return (
    <h1>
      <Layout>
        <Container>
          <p>{pageContext.name}</p>
          <Wrapper>
            {data.allImageSharp.edges.map(image => {
              console.log(image)
              return (
                <Link to={image.node.fields.slug}>
                  <Img sizes={image.node.sizes} />
                </Link>
              )
            })}
          </Wrapper>
        </Container>
      </Layout>
    </h1>
  )
}

export default Country

export const countryQuery = graphql`
  query($name: String) {
    allImageSharp(filter: { fields: { country: { in: [$name] } } }) {
      edges {
        node {
          sizes(maxWidth: 600) {
            ...GatsbyImageSharpSizes
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
