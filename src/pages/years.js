// import React from 'react'
// import Layout from '../components/layout'
// import styled from 'styled-components'
// import { graphql } from 'gatsby'

// import Container from '../components/styles/Container'

// const Years = ({ data }) => {
//   const node = data.allImageSharp.edges
//   return (
//     <Layout>
//       <Container>
//         <h1>Years</h1>
//         {node.map(node => {
//           const { dateTime } = node.node.fields.dateTime
//           console.log(dateTime)
//         })}
//       </Container>
//     </Layout>
//   )
// }

// export default Years

// export const yearsQuery = graphql`
//   query {
//     allImageSharp {
//       edges {
//         node {
//           fields {
//             dateTime
//           }
//         }
//       }
//     }
//   }
// `

//query graphql data layer
// get list of years
// map years to link
