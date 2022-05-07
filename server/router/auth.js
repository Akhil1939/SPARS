const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send("hello from router js");
});

router.post("/register", async (req, res) => {
  const {
    fname,
    mname,
    lname,
    erNo,
    branch,
    email,
    number,
    password,
    cPassword,
  } = req.body;
  //   res.sendStatus("mera router");
  // res.json({message:req.body})

  if (
    !fname ||
    !mname ||
    !lname ||
    !erNo ||
    !branch ||
    !email ||
    !number ||
    !password ||
    !cPassword
  ) {
    return res.status(422).json({ error: "fill the proper details" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cPassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({
        fname,
        mname,
        lname,
        erNo,
        branch,
        email,
        number,
        password,
        cPassword,
      });

      //hash password
      //middleware

      await user.save();
      return res.status(201).json({ message: "user registered successfully" });
    }
    //thapa technial video 10
    // .then((userExist)=>{
    //     if(userExist){
    //         return res.status(422).json({error: "Email already exist"});

    //     }
    //     const user = new User({fname, mname, lname, erNo, branch, email, number, password, cPassword});
    //     user.save().then(()=>{
    //         return res.status(201).json({error: "user registered successfully"});

    //     }).catch((err)=> res.status(500).json({error : err}));
    // }).catch(err => {console.log(err);});
  } catch (err) {
    console.log(err);
  }
});

//Login route

router.post("/login", async (req, res) => {
  // console.log(req.body);
  // res.json({message:'awosomw'})
  try {
      let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires:new Date(Date.now() +259200000),
        httpOnly:true 
      })

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });

      } else {
        res.json({ message: "user signIn successfully" }); 
      }
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  upload page
router.get("/upload",authenticate, (req, res) => {
  // res.cookie("Test", 'upload')
  console.log("upload from node")
  res.send(req.rootUser);
});

module.exports = router;
