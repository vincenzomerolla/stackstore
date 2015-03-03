var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: String
  products: [{ type: Schema.Types.Objectid, ref: 'Review' }] 
});

module.exports = mongoose.model('Category', categorySchema);