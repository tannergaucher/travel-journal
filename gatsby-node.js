const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const fastExif = require('fast-exif')
const getColors = require('get-image-colors')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'ImageSharp' && node.id.includes('/posts/')) {
    const absolutePath = node.id.split(' ')[0]
    fastExif
      .read(absolutePath)
      .then(exifData => {
        //create metadata object from exifdata
        const metadata = {
          date: exifData.exif.DateTimeOriginal,
          latRef: exifData.gps.GPSLatitudeRef,
          lat: exifData.gps.GPSLatitude,
          lonRef: exifData.gps.GPSLongitudeRef,
          lon: exifData.gps.GPSLongitude,
        }
        //make metadata data queryable
        createNodeField({
          node,
          name: 'metadata',
          value: metadata,
        })
      })
      .catch(err => console.log(err))

    //create slugs from images
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    //get array of colors from each image node
    // getColors(absolutePath)
    //   .then(colors => {
    //     //add color array no node field
    //     // console.log(colors[0], colors[1])
    //     console.log(colors[0]._rgb, colors[1]._rgb)
    //   })
    //   .catch(err => console.log(err))
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allImageSharp {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allImageSharp.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/full-size.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
