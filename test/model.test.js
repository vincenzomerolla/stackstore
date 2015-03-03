//Use jasmine-node for test

var mongoose = require('mongoose')
  , should = require('should');

// var Product = require('../db/models/product.js')
var Review = require('../server/db/models/review');

describe('Database Models',function(){

	// describe('Product Model',function(){
	// 	it('should create an entry', function(done){
	// 		var a_product = new Product({
	// 			title : "TV 40inches plasma display",
	// 			description : "an awesome tv",
	// 			price : 500
	// 		});
	// 		a_product.save();
	// 		Product.findOne({title : "TV 40inches plasma display"},function(err,data){
	// 			data.price.should.equal(500);
	// 		});
	// 	});

	// 	it('do something else',function(done){

	// 	});
	// });
	
	describe('Review Model',function(){
		beforeEach(function(){
			Review.remove().exec();
		});


		it('should create an entry',function(done){
			Review.create({});
			done();
		});
	});
});