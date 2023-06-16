const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt)
  next();
})
module.exports = mongoose.model("User", userSchema);

