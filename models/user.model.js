const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const encrypt= require("mongoose-encryption")
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const config = require("../config/config");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    reuire: true,
  },
  email: {
    type: String,
    reuire: true,
  },
  password: {
    type: String,
    reuired: [true,"please add a password"],
    minlength: 6,
    select:false
  },
  googleId:{type:String,
  } ,
  secret: {type:String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});
/////for bcrypt encryption
// userSchema.pre("save", async function(next){
//   if(!this.isModified("password")){
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password= await bcrypt.hash(this.password,salt)
//   next();
// })

// userSchema.methods.matchpasswords = async function(password) {
//   return await bcrypt.compare(password,this.password);
// }


////for mongoose encryption

// userSchema.plugin(encrypt,{secret:config.secret.secret,encryptedFields:["password",]});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);

