const express=require("express");
const app=express();
const mongoose=require('mongoose');
const userModel=require("./models/User");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cookieParser=require('cookie-parser');
const authMiddleware=require('./middleware/authMiddleware');
const notesRoutes=require('./routes/notes');

require('dotenv').config();
const { uri, port } = process.env;
mongoose.connect(uri);

app.use(express.json());
app.use(cookieParser());



// Use authRoutes for /auth route
app.use('/auth', authRoutes);

app.use('/',notesRoutes);

// app.get('/protected/example', (req, res) => {
//   res.json({ message: 'Authenticated Route', user: req.user });
// });

app.listen(port, () => {
  console.log("Connection has been created on port 8000");
});