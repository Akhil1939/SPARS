const dotenv = require('dotenv')
const express = require("express");
const app = express();
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'})
require('./db/conn')
// const User = require('./model/userSchema')
app.use(express.json());
//router file for storing path
app.use(require('./router/auth')); 

const PORT = process.env.PORT;


// const middleware = (req, res, next) => {
//   console.log("hello my middleware");
//   next();

// };

// middleware()

app.get("/dashboard", (req, res) => {
  res.send("dashboard"); 

});
app.get("/login", (req, res) => {
  res.send("login"); 

});
app.get("/verification", (req, res) => {
  res.send("verification");
});
// app.get("/upload",middleware, (req, res) => {
//   // res.cookie("Test", 'upload')
//   res.send("upload");
// });
app.get("/report", (req, res) => {
  res.send("Report");
});
app.get("/contactUs", (req, res) => {
  res.send("Contact Us");
});
console.log("Subscribe");

app.listen(PORT, () => {
  console.log(`server is running on port no ${PORT}`);
});
