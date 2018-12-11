import React from 'react'
import styled from 'styled-components'
import { Container as container, Flex, Card } from 'rebass'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

const Container = styled(container)`
  padding-left: 0px;
  padding-right: 0px;
`

function formatDate(dateTime) {
  return dateTime.split('T')[0]
}

function formatTime(dateTime) {
  const time = dateTime.split('T')[1].split('.')
  return time[0]
}

class Index extends React.Component {
  render() {
    const { data } = this.props
    const images = data.allImageSharp.edges

    return (
      <Layout>
        <Container maxWidth="800px">
          <Flex flexDirection="column" justifyContent="center">
            {images.map(image => {
              const { metadata } = image.node.fields
              return (
                <Card
                  key={image.node.id}
                  mt={[4, 5]}
                  mb={[4, 5]}
                  boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                >
                  <Link to={image.node.fields.slug}>
                    <Img sizes={image.node.sizes} />
                  </Link>
                  <Flex justifyContent="space-around">
                    <h6>{formatDate(image.node.fields.dateTime)}</h6>
                    <h6>{formatTime(image.node.fields.dateTime)}</h6>
                    <Link
                      to={`/countries/${kebabCase(image.node.fields.country)}`}
                    >
                      <h6>{image.node.fields.country}</h6>
                    </Link>
                  </Flex>
                </Card>
              )
            })}
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default Index

export const indexQuery = graphql`
  query {
    allImageSharp(sort: { fields: fields___dateTime, order: DESC }) {
      edges {
        node {
          id
          sizes(maxWidth: 800) {
            ...GatsbyImageSharpSizes
          }
          fields {
            slug
            dateTime
            country
          }
        }
      }
    }
  }
`
