import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    minLength: [4, "Please enter a valid name!"],
    maxLength: [50, "Please enter a valid name!"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email!"],
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
      type: String, // Public ID for Cloudinary
      required: [true, "Please provide your resume!"],
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Applicant ID
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"], // Role for applicant
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Employer ID
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"], // Role for employer
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
