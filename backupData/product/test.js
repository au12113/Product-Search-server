// var productFile = require("./allProduct/product.json");
// var product2 = require("./allProduct/product2.json");
// var acer = require("./allProduct/ACER product.json");
// var dell = require("./allProduct/DELL product.json");
// var lenovo = require("./allProduct/Lenovo product.json");
// var sony = require("./allProduct/SONY product.json");
// var toshiba = require("./allProduct/toshiba.json");
// var hp = require("./allProduct/hp.json");
// var samsung = require("./allProduct/samsung.json");
// var alienware = require("./allProduct/alienware.json");
// var surface = require("./allProduct/surface.json");
// var razer = require("./allProduct/razer.json");
// var msi = require("./allProduct/msi.json");

var extracted = require("./extracted.json");
var filters = require("./fieldList.json");

const _ = require("lodash");
const fs = require("fs");

// var fileList = [
//   productFile,
//   product2,
//   acer,
//   dell,
//   lenovo,
//   sony,
//   toshiba,
//   hp,
//   samsung,
//   alienware,
//   surface,
//   razer,
//   msi
// ];

const getSubset = (keys, obj) =>
  keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

var extractedProduct = [];

const extractProduct = obj => {
  for (var index = 0; index < obj.results.length; index++) {
    //basic sales information
    var product = getSubset(
      ["brand", "model", "images", "price_currency"],
      obj.results[index]
    );
    //feature filtering
    if (obj.results[index].features != undefined) {
      var filtered = { features: {} };
      for (var category = 0; category < filters.length; category++) {
        var currCategory = [];
        for (var filter = 0; filter < filters[category].length; filter++) {
          if (
            filters[category][filter] in obj.results[index].features &&
            currCategory.indexOf(
              obj.results[index].features[filters[category][filter]]
            ) == -1
          ) {
            currCategory.push(
              obj.results[index].features[filters[category][filter]]
            );
          }
        }
        if (currCategory.length > 0)
          filtered.features[filters[category][0]] = currCategory;
      }
    }
    //sales information
    for (var site = 0; site < obj.results[index].sitedetails.length; site++) {
      var productSite = getSubset(
        ["url"],
        obj.results[index].sitedetails[site]
      );
      for (
        var sale = 0;
        sale < obj.results[index].sitedetails[site].latestoffers.length;
        sale++
      ) {
        var productSale = getSubset(
          ["price", "seller", "currency", "condition", "firstrecorded_at"],
          obj.results[index].sitedetails[site].latestoffers[sale]
        );
        extractedProduct.push(
          Object.assign({}, product, productSite, productSale, filtered)
        );
      }
    }
  }
};

// unused get field
// const getFieldList = productList => {
//   var keys = [];
//   for (var object = 0; object < productList.length; object++) {
//     for (var key in productList[object].features) {
//       if (keys.indexOf(key) == -1) {
//         keys.push(key);
//       }
//     }
//   }
//   fs.writeFileSync("./fieldList.json", JSON.stringify(keys.sort()));
// };

// get all field in features
// getFieldList(extracted)

// get product in each json
// for (var i = 0; i < fileList.length; i++) {
//   // console.log(fileList[i]);
//   extractProduct(fileList[i]);
// }
// fs.writeFileSync("./extracted.json", JSON.stringify(extractedProduct));
