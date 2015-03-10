var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	rating: { type: Number, min: 1, max: 5 },
	subject:{ type: String, required: true, min: 5 },
	content:{ type : String, required: true, min: 10},
	user: { type : Schema.Types.ObjectId, ref : 'User' },
	createdAt : { type : Date, default : Date.now }
});


reviewSchema.static('populateUser', function(reviews) {
  return this.populate(reviews, { path: 'user', select: '-salt -password' });
})

module.exports = mongoose.model('Review', reviewSchema); 

