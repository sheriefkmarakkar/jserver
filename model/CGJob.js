var mongo = require('mongoose');

var schema = mongo.Schema;

var jobSchema = new schema({
    id : String,
     pdate: String,
    jname : String,
    qual:String,
   cat:String,
    ldate:String,
    fileContent:String,
    other:String,
    link:String,
    state:String
    

})

var CGjobModel = mongo.model("CGjob", jobSchema,'CGjob');

module.exports = CGjobModel;