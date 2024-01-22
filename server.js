const express=require("express");
const app=express();
const mongoose=require('mongoose');
const userModel=require("./models/User");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

console.log(authRoutes);
require('dotenv').config();
const {uri,port}=process.env;
mongoose.connect(uri);

app.use(bodyParser.json());
app.use('/auth',authRoutes);

app.listen(port,()=>{
    console.log("Connection has been created on port 8000");
});