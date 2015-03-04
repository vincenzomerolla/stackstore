var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
//var request = require('request');
var async = require('async');
var qs = require('querystring');

require('./db')
var Product = require('./db/models/product')
var _ = require('lodash');


//Search video game subcategories
//http://api.remix.bestbuy.com/v1/categories(id=abcat0700000)?format=json&apiKey=878a7d8thez8v8ve2bw5d5sw

var categories =  [
  { id: "pcmcat300300050002", name: "Xbox One" },
  { id: "abcat0701000", name: "Xbox 360" },
  { id: "pcmcat295700050012", name: "PlayStation 4" },
  { id: "abcat0703000", name: "PlayStation 3" },
  { id: "pcmcat273800050036", name: "Wii U" },
  { id: "abcat0706000", name: "Wii" }
];


var props = ['name', 'regularPrice', 'manufacturer', 'image', 'thumbnailImage', 'largeFrontImage', 'customerReviewAverage', 'platform', 'esrbRating', 'shortDescription', 'longDescription', 'releaseDate'];


var config = {
  filters: {
    classId: 92,
    releaseDateStart: '2013-11-01',
    releaseDateEnd: '2015-03-03',
  },
  queryParams: {
    format: 'json',
    apiKey: '878a7d8thez8v8ve2bw5d5sw',
    pageSize: 100,
    //show: props.join()
  }
};

function createUrl(id, filters) {
  return [ 'http://api.remix.bestbuy.com/v1/products(',
            qs.stringify({'categoryPath.id': id, 'classId': filters.classId}),
            '&releaseDate>', filters.releaseDateStart,
            '&releaseDate<',filters.releaseDateEnd,
            ')' ].join('');
}



function extractFields(bestBuyProduct) {
  var newProduct = {
    title: bestBuyProduct.name,
    description: bestBuyProduct.longDescription,
    price: +((bestBuyProduct.regularPrice*100).toFixed()),
    inventory: 15,
    manufacturer: bestBuyProduct.manufacturer,
    image: bestBuyProduct.largeFrontImage,
    platform: bestBuyProduct.platform,
    releaseDate: new Date(Date.parse(bestBuyProduct.releaseDate)),
    numberOfPlayers: bestBuyProduct.numberOfPlayers,
    esrbRating: bestBuyProduct.esrbRating,
    customerReviewAverage: bestBuyProduct.customerReviewAverage
  };
  return newProduct;
}

var promises = [];

//categories.forEach(function(category) {
//
var category = categories[process.argv[2]];
console.log(category);

var promise = request.getAsync({ url: createUrl(category.id, config.filters), qs: config.queryParams }).then(function(contents) {
  var body = contents[1];
  //console.log(body)
  try {
    var b = JSON.parse(body);
    //console.log('body', b)
  } catch(e) {
    console.log(e)
    return;
  }
  return b.products;
});


promise
  .then(function(products) {
    return products.map(extractFields);
  })
  .then(function(p) {
    return Product.create(p);
  })
  .then(function(results) {
    console.log('done');
    process.exit(0);
  })
  .catch(function(err) {
    console.log('error: ', err);
  })