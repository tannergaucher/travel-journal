import React from 'react'
import { Container, Flex, Box, Caps } from 'rebass'
import Layout from '../components/layout'
import Img from 'gatsby-image'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const images = data.allImageSharp.edges
    //map over all other post types: images, markdown, audio, video, and render

    return (
      <Layout>
        <Container maxWidth="800px">
          <Flex flexDirection="column" justifyContent="center">
            {images.map(image => {
              const { metadata } = image.node.fields
              return (
                <Box key={image.node.id} mt={[4, 5]} mb={[4, 5]}>
                  <Img sizes={image.node.sizes} />
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
