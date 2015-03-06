var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
	title: { type: String, unique: true, required: true },
	description: { type: String, min: 10},
	price: { type: Number, required: true },
	inventory: Number,
	manufacturer: String,
	image: {type: String, default: 'http://placehold.it/388x500&text=No+image'},
  releaseDate: Date,
  platform: String,
  isAvailable: {type: Boolean, default: true},
  esrbRating: String,
  numberOfPlayers: String,
  categories: [{ type: String, ref: 'Category' }],
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

productSchema.static('findByIdAndAddReview', function(id, review) {
  return this.findByIdAndUpdate(id, {$push: {reviews: review._id}});
})

module.exports = mongoose.model('Product', productSchema);

