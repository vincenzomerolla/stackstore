var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

require('./db')
var Product = require('./db/models/product');
var Category = require('./db/models/category');

var _ = require('lodash');

//Search video game subcategories
//http://api.remix.bestbuy.com/v1/categories(id=abcat0700000)?format=json&apiKey=878a7d8thez8v8ve2bw5d5sw

var platforms =  [
  { id: "pcmcat300300050002", name: "Xbox One" },
  { id: "abcat0701000", name: "Xbox 360" },
  { id: "pcmcat295700050012", name: "PlayStation 4" },
  { id: "abcat0703000", name: "PlayStation 3" },
  { id: "pcmcat273800050036", name: "Wii U" },
  //{ id: "abcat0706000", name: "Wii" }
];



var config = {
  filters: {
    classId: 92,
    releaseDateStart: '2013-11-01',
    releaseDateEnd: '2015-03-03',
  },
  queryParams: {
    format: 'json',
    apiKey: '878a7d8thez8v8ve2bw5d5sw',
    pageSize: 15,
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

function onePlatform(product) {
  var re = /[,\|]+/g;
  return product.platform.match(re) === null;
}

function extractFields(bestBuyProduct) {
  return {
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
}

var genrePromise = request.getAsync({ url: 'http://www.giantbomb.com/api/genres/', qs: { api_key: '316473f6dd8998d32e8ea7ea99b0ac5ae2e5c185', format: 'json'} });

//var genres = ['Action', 'Adventure', 'Sports', 'Role-Playing', 'Driving/Racing'];

Promise.all( [ Category.remove({}).exec(), Product.remove({}).exec() ])
  .then(function() {
    return genrePromise;
  })
  .then(function(contents) {
    var response = JSON.parse(contents[1]);
    var promises = response.results.map(function(result) {
      return Category.create({ name: result.name });
    })
    return Promise.all(promises);
  })
  .then(function() {
    console.log('Categories created!');

    var platformPromises = platforms.map(function(platform) {
      return request.getAsync({ url: createUrl(platform.id, config.filters), qs: config.queryParams })
    })

    return Promise.all(platformPromises);
  })
  .then(function(contents) {
    console.log(contents.length);

    var products = contents.map(function(content) {
      var body = JSON.parse(content[1]);
      return body.products.map(extractFields).filter(onePlatform);
    })
 
    var productPromises = products.map(function(p) {
      return Product.create(p);
    });

    return Promise.all(productPromises);
  })
  .then(function(results) {
    console.log('done');
    process.exit(0);
  });
  