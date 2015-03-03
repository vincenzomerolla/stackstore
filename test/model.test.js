//Use jasmine-node for test

var mongoose = require('mongoose')
  , should = require('should')
  , expect = require('chai').expect;

require('../server/db/index.js');

var Review = mongoose.model("Review");
var Category = mongoose.model("Category");
var Product = mongoose.model("Product");
var User = mongoose.model("User");
var Order = mongoose.model("Order");
console.log(Order)

describe('Database Models',function(){

	describe('Product Model',function(){
		xit('should create an entry', function(done){
			var a_product = new Product({
				title : "TV 40inches plasma display",
				description : "an awesome tv",
				price : 500
			});
			a_product.save();
			Product.findOne({title : "TV 40inches plasma display"},function(err,data){
				data.price.should.equal(500);
			});
		});

		xit('do something else',function(done){

		});
	});
	
	describe('Review Model',function(){
		beforeEach(function(){
			Review.remove().exec();
		});


		it('should create an entry',function(done){
			Review.create({
				rating : 3,
				subject : "cool",
				content : "really cool"
			});
			Review.findOne({rating:3},function(err,data){
				console.log(data);
				data.subject.should.equal("cool");
				done();
			});
		});

		it('should keep the value when it is saved',function(){

		});


	});



});