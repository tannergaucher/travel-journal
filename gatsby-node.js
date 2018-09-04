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

    //get array of colors from each image node
    getColors(absolutePath)
      .then(colors => {
        //add color array no node field
        // console.log(colors[0], colors[1])
        console.log(colors[0]._rgb, colors[1]._rgb)

        // createNodeField({
        //   node,
        //   name: 'colors',
        //   value: colors,
        // })
      })
      .catch(err => console.log(err))
  }
}

function getHex(colorArr) {
  console.log(colorArr)
  //remove colorArr with last element removed
}
