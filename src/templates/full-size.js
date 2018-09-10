import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 1400px;
`

export default ({ data }) => {
  console.log(data)

  return (
    <Container>
      <Wrapper>
        <Img sizes={data.imageSharp.sizes} />
      </Wrapper>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    imageSharp(fields: { slug: { eq: $slug } }) {
      sizes(maxHeight: 800, maxWidth: 1400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`