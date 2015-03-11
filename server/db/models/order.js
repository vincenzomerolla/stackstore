var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var address = new mongoose.Schema({
	street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    }
});

var orderSchema = new mongoose.Schema({
  products: [{ type : Schema.Types.ObjectId, ref: 'PurchasedProduct'}],
  total: Number,
  status: { type : String },
  createdAt: { type: Date, default: Date.now },
  shippingAddress : {type : Schema.Types.ObjectId, ref: 'Address'}
});

mongoose.model('Address',address)
module.exports = mongoose.model('Order', orderSchema);
