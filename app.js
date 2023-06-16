const express = require("express");
const cors = require("cors");
const ejs = require('ejs')

const bodyParser = require("body-parser")
const User = require("./models/user.model");
require("./config/db");
const config =require("./config/config");
const userSchema= require("./models/user.model")

const secret = config.secret.secret;



const userRouter = require("./routes/user.route");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use("/", userRouter);

// api/users : GET
// api/users/:id : GET
// api/users/ : POST
// api/users/:id : PATCH
// api/users/:id : DELETE

app.get("/", (req, res) => {
 res.render("home");
});
app.get("/register",(req,res)=>{
  res.render("register");
})
app.get("/login",(req,res)=>{
  res.render("login");
})


app.post("/register", function (req,res){
  const newUser = new User ({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save (function(err){
    if (err){
      console.log(err);

    }
    else{
      res.render("secret");
    }
  })
})
app.post ("/login",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username},function(err, foundUser){
    if (err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password === password){
        res.render("secret")
      }
    }
    }
  })
  
})

// route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// //handling server error
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: "something broke",
//   });
// });

module.exports = app;
