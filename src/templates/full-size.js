import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Container = styled.div`
  height: 100vh;
  min-width: 100vw;
`

export default ({ data }) => {
  return (
    <Container>
      test
      <Img
        sizes={data.imageSharp.sizes}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    imageSharp(fields: { slug: { eq: $slug } }) {
      sizes(maxWidth: 1400, maxHeight: 800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
