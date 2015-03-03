var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
  //products not final, fix before pull request
  products: [{ type : Schema.Types.ObjectId, ref: 'Product'}],
  status: { type : Array },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
