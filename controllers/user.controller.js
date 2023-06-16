const ejs = require('ejs')
const express = require("express");
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// app.post("/register", function (req,res){
//   const newUser = new User ({
//     email: req.body.username,
//     password: req.body.password
//   });
//   newUser.save (function(err){
//     if (err){
//       console.log(err);

//     }
//     else{
//       res.render("secret");
//     }
//   })
// })

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      id: uuidv4(),
      email: req.body.username,
      password:req.body.password
    });
    await newUser.save();
    res.render("secret");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    user.name = req.body.name;
    user.age = Number(req.body.age);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ id: req.params.id });
    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
