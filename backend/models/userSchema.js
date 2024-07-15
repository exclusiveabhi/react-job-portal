import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Name must contain more than 4 character"], // iska mtlb hai ["Name must contain more than 4 character"]
    // else part agar true nhi hota hai toh!
    maxLength: [40, "Name not contain more than 40 character"],
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    validate: [validator.isEmail, "Please enter correct email"],
  },
  phone: {
    type: Number,
    required: [true, "Provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [8, "Password must contain minimum 8 character"],
    maxLength: [25, "Password does not contain maximum 25 character"],
  },
  role: {
    type: String,
    required: [true, "Provide your role !"],
    enum: ["Job Seeker", "Employer"], //enum ka mtlb ya toh user Job seeker hoga ya job provide krne wala hoga!
  },
  createAt:{
    type:Date,
    default: Date.now, //yeh by default current time save krega!
  },

});

//Using Bcrypt to HASH the PASSWORD

userSchema.pre("save", async function(next){ //iska mtlb hai schema save krne se phele ek async function call kro password ko hash banane ke liyee!
if(!this.isModified("password")){ //agar password change nhi hua toh move to next!
      next()
}
else{
    this.password = await bcrypt.hash(this.password , 10 ) //this.password to access the password and await mtlb ruko then bcrypt.hash ka use kro or this.password jo hai usko 10 hash mai convert kr do!
}
})


// Comparing the user entered password to the stored password using BCRYPT

userSchema.methods.comparePassword = async function (enteredPassword){ //enteredPassword user ka password hai!
return await bcrypt.compare(enteredPassword, this.password) //compare krke return kr dega yeh! enteredPassword vs storePassword!

}

//JWT Token Generating here!
//methods not method
userSchema.methods.getJWTtoken = function(){ //userSchema ke andar getJWTtoken function hai!
  return jwt.sign({id: _id} ,process.env.JWT_SECRET_KEY),{
    expiresIn: process.env.JWT_EXPIRE
  }
}
//export kr diya userSchema!
 const User = mongoose.model("User", userSchema)
 export default User