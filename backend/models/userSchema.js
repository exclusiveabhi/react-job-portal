import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Name must contain more than 4 characters"],
    maxLength: [40, "Name cannot contain more than 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    validate: [validator.isEmail, "Please enter a correct email"],
  },
  phone: {
    type: Number,
    required: [true, "Provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [8, "Password must contain a minimum of 8 characters"],
    maxLength: [25, "Password cannot contain more than 25 characters"],
    select: false, // Hide password when retrieving user
  },
  role: {
    type: String,
    required: [true, "Provide your role!"],
    enum: ["Job Seeker", "Employer"], // Only "Job Seeker" or "Employer"
  },
  createAt: {
    type: Date,
    default: Date.now, // Set default to current time
  },
});


// Using Bcrypt to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Comparing the user-entered password to the stored password using BCRYPT
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT Token Generating here
userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);
export default User;
