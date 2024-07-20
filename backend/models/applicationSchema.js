import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    minLength: [4, "Please enter your valid name!"],
    maxLength: [50, "Please enter your valid name!"],
  },
  email: {
    type: String,
    validator: [validator.isEmail, "Please enter your valid email!"],
    required: [true, "Please provide your email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide your cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number!"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address!"],
  },
  resume: {
    public_id: {
      type: String, //public_id cloudinary se file upload krne ke liyee!
      required: [true, "Please provide your resume!"],
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId, //applicant ki id mongodb se aayegi!
      ref: "User", //refrence mai user ki detail id se!
      required: true,
    },
  },
  role: {
    type: String,
    enum: "Job Seeker", //enum for user Job Seeker hi hona chaiyee wrna apply nhi kr payega!
    required: true,
  },

  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId, //applicant ki id mongodb se aayegi!
      ref: "User", //refrence mai user ki detail id se!
      required: true,
    },
  },
  role: {
    type: String,
    enum: "Job Seeker", //enum for user Job Seeker hi hona chaiyee wrna apply nhi kr payega!
    required: true,
  },

});


export const Application = mongoose.model("Application" , applicationSchema) //applicationSchema ko Application mai export kra liya!
