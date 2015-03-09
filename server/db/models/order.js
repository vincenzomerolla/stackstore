var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
  products: [{ type : Schema.Types.ObjectId, ref: 'PurchasedProduct'}],
  total: Number,
  status: { type : String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
