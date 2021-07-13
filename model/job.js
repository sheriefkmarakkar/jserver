var mongo = require('mongoose');

var schema = mongo.Schema;

var jobSchema = new schema({
    id : String,
     job: String,
    comp : String,
    cat:String,
    place:String,
    email:String,
    disc:String,
    skill:String,
    exp:String,
    edu:String,
    ldate:String

})

var jobModel = mongo.model("job", jobSchema,'job');

module.exports = jobModel;