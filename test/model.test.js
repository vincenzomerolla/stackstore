//Use npm start for test

var mongoose = require('mongoose')
  , should = require('should')
  , expect = require('chai').expect;

require('../server/db/index.js');

var Review = mongoose.model("Review");
var Category = mongoose.model("Category");
var Product = mongoose.model("Product");
var User = mongoose.model("User");
var Order = mongoose.model("Order");


describe('Database Models',function(){
	beforeEach(function(){
		var a_product = new Product();
	});

	describe('Product Model',function(){
		it('should err without a title',function(){
			var a_product = new Product();
			a_product.validate(function(err){
				expect(err.errors).to.have.property('title');
			});
		});

		it('should err without a price',function(){
			var b_product = new Product({title:"a tv"});
			b_product.validate(function(err){
				expect(err.errors).to.have.property('price');
			});
		});

		it('should create an entry', function(){
			var a_product = new Product({
				title : "TV 40inches plasma display",
				description : "an awesome tv",
				price : 500
			});
			a_product.save();
			Product.findOne({title : "TV 40inches plasma display"},function(err,data){
				expect(data.price).to.equal(500);
			});
		});
	});
	
	describe('Review Model',function(){
		it('should create an entry',function(){
			Review.create({
				rating : 3,
				subject : "cool",
				content : "really cool"
			});
			Review.findOne({rating:3},function(err,data){
				expect(data.subject).to.equal("cool");
			});
		});

	});

	describe('Category Model: ', function() {

		it('requires a name', function(done) {
			var category = new Category();
			category.validate(function (err) {
				expect(err.errors).to.have.property('name');
				done();
			});
		});

		it('should return an error if a category is not unique', function(done) {
			var category1 = new Category({ name: 'Atari' });
			var category2 = new Category({ name: 'Atari' });

			category1.save();
			category2.save(function (err) {
				expect(err.err).to.have.string('dup key');
				done();
			});
		});

	})


});