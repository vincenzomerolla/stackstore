var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    order_id: String,
    products: Array,
    status: String,
    timestamo: String
});


mongoose.model('Order', schema);