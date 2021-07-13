var mongo = require('mongoose');

var schema = mongo.Schema;

var productSchema = new schema({
    productId : String,
    productName : String,
    productPrice : Number 
})

var productModel = mongo.model("products", productSchema);

module.exports = productModel;