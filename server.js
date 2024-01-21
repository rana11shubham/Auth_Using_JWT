const express=require("express");
const app=express();
const userModel=require("./models/User");

require('dotenv').config();
const {uri,port}=process.env;
mongoose.connect(uri);


app.get('/',(req,res)=>{
    res.send("Hi");
});

app.listen(port,()=>{
    console.log("Connection has been created on port 8000");
});