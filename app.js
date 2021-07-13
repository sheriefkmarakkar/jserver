var express = require('express');
var body = require('body-parser');

67n 

var app = express();
const path = require('path');
var multer = require('multer')
var multer = require('multer')
const fs = require('fs');
var upload = multer({ dest: 'uploads/' })
var mongo = require('mongoose');
let nodemailer = require('nodemailer');
var url = "mongodb+srv://footweras:sheriefkm@cluster0-ppyuf.mongodb.net/rcar?retryWrites=true"
var email  = require('emailjs');
var storage =   multer.diskStorage({  
  destination: (req, file, callback)=>{  
    callback(null, './public/images');  
  },  
  filename: (req, file, callback)=>{  
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('image');

mongo.connect(url,{useNewUrlParser:true, useUnifiedTopology: true}, (err)=>{
  if(err) throw err;
  else console.log("Database connected");
})

var user = require('./model/carusers');
var car = require('./model/car');
var job = require('./model/job');
var CGjob=require('./model/CGjob');
const CGjobModel = require('./model/CGjob');

app.use(express.static(path.join(__dirname+"/public"))); 
//app.use(body.urlencoded({ extended: false }));
app.use( body.json({limit: '50mb'}) );
app.use(body.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


  /*var server  = email.server.connect({
     user:    "muhammadsheriefkm@gmail.com",
     password:"muhammadsherief",
     host:    "smtp.gmail.com",
     ssl:     true,
     port: 465
  });*/

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "muhammadsheriefkm@gmail.com",
      pass: "muhammadsherief"
    }
  });


  // verifying the connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages!");
    }
  });
  


app.post("/getlogin",(req,res)=>{
 
  user.find({email:req.body.uname,pass:req.body.pass},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
  })
})
app.get("/getJobs",(req,res)=>{
  job.find({},(err,result)=>{
    if(err)
    throw err;
    else{
      res.send(result)
      console.log(result)
    }
  })
})
app.post("/deleteJ",function(req,res){
  console.log(req.body)
  CGjobModel.deleteOne({_id:req.body.id},function(err,result){
      if (err) throw err;
      else
      {
        res.send({msg:"deleted"})
       
      }
  })
})
app.post("/getStateJobs",(req,res)=>{
  CGjob.find({state:req.body.state},(err,result)=>{
   
    if(err)
    throw err;
    else{
      res.send(result)
      console.log(result)
    }
  })
})
app.get("/getAllJobs",(req,res)=>{
  CGjob.find({},(err,result)=>{
   
    if(err)
    throw err;
    else{
      res.send(result)
      console.log(result)
    }
  })
})
app.get("/getCGJobs",(req,res)=>{
  CGjob.find({cat: {$in: ['CENTRAL', 'OTHER']}},(err,result)=>{
   
    if(err)
    throw err;
    else{
      res.send(result)
      console.log(result)
    }
  })
})
app.post("/getAll",(req,res)=>{
  CGjob.find({cat:req.body.cat},(err,result)=>{
    if(err)
    throw err;
    else{
      console.log(result)
      res.send(result)
      
    }
  })
})
app.post("/getSSCJobs",(req,res)=>{
  CGjob.find({other:req.body.jc},(err,result)=>{
    if(err)
    throw err;
    else{
      console.log(result)
      res.send(result)
      
    }
  })
})
app.get("/getOtherJobs",(req,res)=>{
  CGjob.find({cat:'OTHER'},(err,result)=>{
    if(err)
    throw err;
    else{
      console.log(result)
      res.send(result)
      
    }
  })
})
app.post("/getCat",(req,res)=>{
  console.log("request came");
  let user = req.body.c;
  console.log(user)
  job.find({cat:req.body.c},(err,result)=>{
    if(err)
    throw err;
    else{
      
      console.log(result)
      res.send(result)
    }
  })
})
app.get("/getcars",(req,res)=>{
 
  car.find({},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
function login()
{
  if(req.body.user)
  {
    return next()
  }
  else
  {
    return res.status(401).json({status: 'Please log in'});
  }
}
app.post("/postCGJob",(req,res)=>{
  console.log(req.body)
  var j=new CGjob(req.body)
  j.save((err)=>{
    if(err){
      console.log("err")
      throw err;
      
    }
    else{
    res.send({msg:"Data Added"})
    
    }
  })
})
app.post("/postJob",(req,res)=>{
  console.log(req.body)
  var j=new job(req.body)
  j.save((err)=>{
    if(err){
      console.log("err")
      throw err;
      
    }
    else{
    res.send({msg:"Data Added"})
    
    }
  })
})
// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(user)
 /*sendMail(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });*/
  //alert(req.body)
  const mail = {
    
    from: `"PlaceWell",<${user.email1}>`,
    to: `<${user.semail}>`,
    subject: "Application For Job Opening",
    html: "<h1></h1>",
    attachments: [  {  
      filename: 'CV.pdf',
      path:user.fileContent
     // content: Buffer.from(user.fileContent, 'base64'),
      //path: 'C:/Users/hp/downloads/sherief.pdf',
    //  contentType: 'application/pdf',
    // content: Buffer.from(user.fileContent)
     //content: fs.createReadStream(user.fileContent)
      //contentType: 'application/pdf'
  }]
  };
transporter.sendMail(mail, (err, data) => {
  if (err) {
    console.log(err)
    }
   else {
    
      console.log("send")
    }
  
})
/*
server.send({
  text:    "Your message body text",
  from: `<${user.email1}>, "muhammadsheriefkm@gmail.com"`,
    to: `<${user.email1}>`,
    subject: "<Message subject>",
    
  attachment:
  [
     {data:"<html><strong>A bit of HTML text</strong></html>", alternative:true},
     {path:"user/desktop/file.pdf", type:"application/pdf", name:"renamed.pdf"}
  ]
}, function(err, message) {
   if(err)
   console.log(err);
   else
   {
   res.json({success: true, msg: 'sent'});
   console.log(message);
   }
});*/
   
});
app.post("/postbook", (req,res)=>{
  console.log(req.body)
  var b1 = new book(req.body);
  b1.save((err)=>{
    if (err) throw err;
    else res.send({msg:"data added"})
  })
})

app.post("/getuser",(req,res)=>{
  user.find({_id:req.body.uid},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
app.post("/getbooks",(req,res)=>{
 console.log(req.body.number)
  book.find({num:req.body.number},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})

app.post("/getsinglecar",(req,res)=>{
  alert(req.body.number)
  console.log(req.body.number)
   car.find({num:req.body.number},(err,result)=>{
     if (err)
     {
  
       throw err;
     }
     else res.send(result);
     console.log(result)
   })
 })

app.post("/postdata", (req,res)=>{
  console.log(req.body)
  var u1 = new user(req.body);
  //u1.phn=req.body.phn;
  //u1.role=req.body.role;
  u1.save((err)=>{
    if (err) throw err;
    else res.send({msg:"data added"})
  })
})
app.post("/cardata",upload ,(req,res)=>{
  console.log(req.body)
 if(req.body.cname !=undefined)
 {
  var c1 = new car(req.body);
  c1.save((err)=>{
    if (err) throw err;
    else res.send({msg:"data added"})
  })
 }
})
app.post("/deleteb",function(req,res){
  console.log(req.body)
  book.deleteOne({_id:req.body.uid},function(err,result){
      if (err) throw err;
      else
      {
        res.send({msg:"data added"})
       
      }
  })
})
app.post("/getmybooks", (req,res)=>{
  console.log(req.body)
  book.find({id:req.body.uid},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
app.post("/getall", (req,res)=>{
  console.log(req.body)
  book.find({__v:req.body.uid},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
app.get("/added",function(req,res){
  console.log("Data Added")
  res.send("Data Added")
})

app.post("/upuser", (req,res)=>{
  user.updateOne({_id:req.body.uid} ,{$set:{
    name:req.body.name,
    email : req.body.email,
    phn : req.body.phn,
 
    pass:req.body.pass
}}, function(err,result){
  if (err) throw err;
  else{
    
  console.log(req.body)
   res.send({msg:"data added"})
  }
  })
})
app.post("/uprent", (req,res)=>{
  book.updateOne({_id:req.body.uid} ,{$set:{
    __v:1
 
    
}}, function(err,result){
  if (err) throw err;
  else{
    
  console.log(req.body)
   res.send({msg:"data added"})
  }
  })
})

app.listen(8080,()=>{
  console.log("Listening");
})

