const express=require("express");
const app=express();
const mongoose=require('mongoose');
const userModel=require("./models/User");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cookieParser=require('cookie-parser');
const authMiddleware=require('./middleware/authMiddleware');

console.log(authRoutes);
require('dotenv').config();
const { uri, port } = process.env;
mongoose.connect(uri);

app.use(bodyParser.json());
app.use(cookieParser());

// Apply authMiddleware to /protected route
app.use('/protected', authMiddleware);

// Use authRoutes for /auth route
app.use('/auth', authRoutes);

app.get('/protected/example', (req, res) => {
  res.json({ message: 'Authenticated Route', user: req.user });
});

app.listen(port, () => {
  console.log("Connection has been created on port 8000");
});