var mongo = require('mongoose');

var schema = mongo.Schema;

var carSchema = new schema({
    cname : String,
    company : String,
    year : String,
    colour:String,
    num:String,
    price:String,
   // image:String
    
  
})

var carModel = mongo.model("car", carSchema,'cars');

module.exports = carModel;