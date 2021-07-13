var express = require('express');
var app = express();
app.listen(8080,()=>{
    console.log("Listening")
})
app.get("/",(req,res)=>{
    res.send("about")
})
app.post("/login",(req,res)=>{
    res.send("login
    
    ")
})