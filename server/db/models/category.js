var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: { type: String, unique: true, required: true }
});

categorySchema.static('findByName', function(name) {
  return this.find({name: name});
})

module.exports = mongoose.model('Category', categorySchema);