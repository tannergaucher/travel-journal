import React from 'react'
import styled from 'styled-components'
import { Container as container, Flex, Caps, Card } from 'rebass'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const Container = styled(container)`
  padding-left: 0px;
  padding-right: 0px;
`

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
                  <Caps mt={3}>{metadata.date}</Caps>
                  <Caps mt={3}>
                    {metadata.latRef}
                    {metadata.lat}
                    {metadata.lonRef}
                    {metadata.lon}
                  </Caps>
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
    allImageSharp(sort: { fields: fields___metadata___date, order: DESC }) {
      edges {
        node {
          id
          sizes(maxWidth: 800) {
            ...GatsbyImageSharpSizes
          }
          fields {
            slug
            metadata {
              date
              latRef
              lat
              lonRef
              lon
            }
          }
        }
      }
    }
  }
`
