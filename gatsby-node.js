const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fastExif = require('fast-exif')
const _ = require('lodash')

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_GEOCODE_API,
  Promise: Promise,
})

function formatCoords(coordArr, coordRef) {
  const formattedCoords = []
  coordArr.map(coords => formattedCoords.push(coords))
  formattedCoords.push(coordRef)
  return formattedCoords
}

function convertDMStoDD(coordsArr) {
  const degrees = coordsArr[0]
  const minutes = coordsArr[1]
  const seconds = coordsArr[2]
  const direction = coordsArr[3]
  let dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60)

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1
  }
  return dd
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'ImageSharp' && node.id.includes('/posts/')) {
    const absolutePath = node.id.split(' ')[0]
    fastExif
      .read(absolutePath)
      .then(exifData => {
        const { gps } = exifData
        const lat = convertDMStoDD(
          formatCoords(gps.GPSLatitude, gps.GPSLatitudeRef)
        )
        const lng = convertDMStoDD(
          formatCoords(gps.GPSLongitude, gps.GPSLongitudeRef)
        )
        const coords = [lat, lng]
        const dateTime = exifData.exif.DateTimeOriginal

        googleMapsClient
          .reverseGeocode({
            latlng: { lat, lng },
          })
          .asPromise()
          .then(response => {
            const { results } = response.json
            const country = results[0].formatted_address.split(', ').slice(-1)

            createNodeField({
              node,
              name: 'country',
              value: country || '',
            })
          })
          .catch(err => {
            console.log(err)
          })

        createNodeField({
          node,
          name: 'coords',
          value: coords,
        })

        createNodeField({
          node,
          name: 'dateTime',
          value: dateTime,
        })
      })
      .catch(err => console.log(err))

    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allImageSharp {
          group(field: fields___country) {
            fieldValue
            totalCount
          }
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
      .then(result => {
        // dynamically create a full size image page for each image node
        result.data.allImageSharp.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/full-size.js`),
            context: {
              slug: node.fields.slug,
            },
          })
        })
        // create a page for each country node
        result.data.allImageSharp.group.map(country => {
          const name = country.fieldValue
          createPage({
            path: `/countries/${_.kebabCase(name)}`,
            component: path.resolve(`./src/templates/country.js`),
            context: {
              name: name,
            },
          })
        })
        resolve()
      })
      .catch(err => console.log(err))
  })
}
