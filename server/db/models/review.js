var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new mongoose.Schema({
	rating:{
		type : Number,
		min : 1,
		max : 5
	},
	subject:{
		type : String
	},
	content:{
		type : String
	},
	user:[{
		type : Schema.Types.ObjectId,
		ref : 'User'
	}],
	time : {
		type : Date,
		default : Date.now
	}
});

mongoose.model('Review', reviewSchema); 