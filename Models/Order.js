const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    status: String,
    totalPrice: Number,
    items: Array
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
