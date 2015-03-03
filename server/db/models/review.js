var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
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
	// user:[{
	// 	type : Schema.Types.ObjectId,
	// 	ref : 'User'
	// }],

	// Got error: type : Schema.Types.ObjectId, 
	// ReferenceError: Schema is not defined
	user : [userSchema],
	time : {
		type : Date,
		default : Date.now
	}
});

var userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

module.exports = mongoose.model('Review', reviewSchema); 