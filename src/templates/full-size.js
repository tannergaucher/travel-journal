// import React from 'react'
// import { graphql } from 'gatsby'
// import Img from 'gatsby-image'
// import styled from 'styled-components'

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
// `

// export default ({ data }) => {
//   return (
//     <Container>
//       <Img
//         sizes={data.imageSharp.resolutions}
//         style={{
//           position: 'absolute',
//           top: 0,
//           width: '100%',
//           height: '100%',
//         }}
//       />

//       {/* Other aspect ratio */}
//       {/* <Img sizes={data.imageSharp.resolutions} /> */}
//     </Container>
//   )
// }

// export const query = graphql`
//   query($slug: String!) {
//     imageSharp(fields: { slug: { eq: $slug } }) {
//       sizes(maxWidth: 1400, maxHeight: 800) {
//         ...GatsbyImageSharpSizes
//       }
//     }
//   }
// `
