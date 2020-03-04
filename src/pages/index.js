import React from 'react'
import Img from 'gatsby-image'
import { Card } from 'rebass'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import formatDate from '../lib/formatDate'
import formatTime from '../lib/formatTime'

import Pagination from '../components/Pagination'
import Link from '../components/styles/Link'
import Container from '../components/styles/Container'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const images = data.allImageSharp.edges
    console.log(this.props.pageContext)

    return (
      <Layout>
        <Container mt={[2, 4]}>
          {images.map(image => {
            const { fields, id } = image.node
            const date = formatDate(fields.dateTime)
            const time = formatTime(fields.dateTime)
            const latitude = fields.geo.lat.toPrecision(4)
            const longitude = fields.geo.lng.toPrecision(4)

            return (
              <Card
                key={id}
                boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                mb={[2, 4]}
                p={[2]}
              >
                <Link to={fields.slug}>
                  <Img sizes={image.node.sizes} style={{ zIndex: 2 }} />
                </Link>
              </Card>
            )
          })}
          <Pagination numPages={this.props.pageContext.numPages} />
        </Container>
      </Layout>
    )
  }
}

export default Index

export const indexQuery = graphql`
  query indexQuery($skip: Int, $limit: Int) {
    allImageSharp(
      sort: { fields: fields___dateTime, order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
            geo {
              lat
              lng
            }
          }
        }
      }
    }
  }
`
