var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    order_id: { type : String },
    //products not final, fix before pull request
    products: [{ type : Schema.Types.ObjectId, ref: 'Product'}],
    status: { type : Array },
    timestamp: {type: Date, default: Date.now}
});

mongoose.model('Order', orderSchema);