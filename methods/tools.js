const fs = require('fs')

module.exports = {
  // getQueryphrase: function(reqQuery) {
  //   for(var i = 0; i < reqQuery.length)
  // }
  // ,
  getQueryObject: function (reqQuery) {
    var queryObject = {}
    if (reqQuery.brand !== undefined) {
      queryObject.brand = {
        $in: reqQuery.brand
      }
    }
    if (reqQuery.CPU !== undefined) {
      queryObject["features.CPU"] = {
        $in: [reqQuery.CPU]
      }
    }
    if (reqQuery.price !== undefined) {
      queryObject.price = {
        $lt: reqQuery.price
      }
    }
    if (reqQuery.OS !== undefined) {
      queryObject["features.OS"] = {
        $in: [reqQuery.OS]
      }
    }
    if (reqQuery.screen !== undefined) {
      queryObject["features.screen"] = {
        $in: [reqQuery.screen]
      }
    }
    if (reqQuery.phrase !== undefined) {
      queryObject["$text"] = {
        $search: reqQuery.phrase
      }
    }
    return queryObject
  },
  getQueryObjectWithoutPrice: function (reqQuery) {
    var queryObject = {}
    if (reqQuery.brand !== undefined) {
      queryObject.brand = {
        $in: reqQuery.brand
      }
    }
    if (reqQuery.OS !== undefined) {
      queryObject["features.OS"] = {
        $in: [reqQuery.OS]
      }
    }
    if (reqQuery.screen !== undefined) {
      queryObject["features.screen"] = {
        $in: [reqQuery.screen]
      }
    }
    if (reqQuery.phrase !== undefined) {
      queryObject["$text"] = {
        $search: reqQuery.phrase
      }
    }
    return queryObject
  }
  // getFieldKeys: function(products) {
  //   var filters = {}
  //   var filterKeys = Object.keys(products[0]._doc.features)
  //   for (var i = 0; i < filterKeys.length; i++) {
  //     filters[filterKeys[i]] = []
  //   }
  //   for (var i = 0; i < products.length; i++) {
  //     for (
  //       var featureIndex = 0; featureIndex < filterKeys.length; featureIndex++
  //     ) {
  //       var feature = filterKeys[featureIndex]
  //       if (products[i]._doc.features[feature] !== undefined) {
  //         for (
  //           var subDetail = 0; subDetail < products[i]._doc.features[feature].length; subDetail++
  //         ) {
  //           if (
  //             filters[feature].indexOf(
  //               products[i]._doc.features[feature][subDetail]
  //             ) === -1
  //           ) {
  //             filters[feature].push(
  //               products[i]._doc.features[feature][subDetail]
  //             )
  //           }
  //         }
  //       }
  //     }
  //   }
  //   fs.writeFileSync('./backupData/test.json', JSON.stringify(filters))
  //   return filters
  // }
}
