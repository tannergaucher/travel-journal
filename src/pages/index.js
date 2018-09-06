import React from 'react'
import { Container, Flex, Box, Caps } from 'rebass'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

class Index extends React.Component {
  state = {
    fullscreen: false,
  }

  render() {
    const { data } = this.props
    const images = data.allImageSharp.edges
    const { fullscreen } = this.state

    return (
      <Layout>
        <Container maxWidth="800px">
          <Flex flexDirection="column" justifyContent="center">
            {images.map(image => {
              const { metadata } = image.node.fields
              return (
                <Box key={image.node.id} mt={[4, 5]} mb={[4, 5]}>
                  <Link to={image.node.fields.slug}>
                    <Img sizes={image.node.sizes} />
                  </Link>
                  <Caps mt={3}>{metadata.date}</Caps>
                  <Caps mt={3}>
                    {metadata.latRef}
                    {metadata.lat} {metadata.lonRef}
                    {metadata.lon}
                  </Caps>
                </Box>
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
    allImageSharp {
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
