var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    order_id: { type : String },
    products: { type : Array },
    status: { type : Array },
    timestamp: {type: Date, default: Date.now}
});

mongoose.model('Order', schema);