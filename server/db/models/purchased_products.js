var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var purchasedProductSchema = new Schema({
	product: { type : Schema.Types.ObjectId, ref: 'Product'},
	purchasedPrice : {type : Number, required : true},
	quantity : {type : Number, required : true}
});

module.exports = mongoose.model('PurchasedProduct', purchasedProductSchema);