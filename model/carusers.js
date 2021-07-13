var mongo = require('mongoose');

var schema = mongo.Schema;

var userSchema = new schema({
    name : String,
    email : String,
    phn : String,
    pass:String,
    role:String
})

var userModel = mongo.model("user", userSchema,'users');

module.exports = userModel;