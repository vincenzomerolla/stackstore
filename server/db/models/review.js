var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var reviewSchema = new mongoose.Schema({
	rating:{
		type : Number,
		min : 1,
		max : 5
	},
	subject:{
		type : String,
    required: true,
    min: 5
	},
	content:{
    required: true,
		type : String,
    min: 10
	},
	user: {
		type : Schema.Types.ObjectId,
		ref : 'User'
	},
	createdAt : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Review', reviewSchema); 

