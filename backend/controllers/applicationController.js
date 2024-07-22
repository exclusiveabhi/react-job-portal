import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import {Job} from "../models/jobSchema.js"
export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const role = req.user.role;
    if (role == "Job Seeker") {
      return next(
        new errorHandler("Not authorized to get the resource !", 400)
      ); 
    }
    const { _id } = req.user; //_id for mongodb id getting!
    const applications = await Application.find({ "employerID.user": _id }); //agar job database mai hai toh!
    res.status(200).json({
      sucess: true,
      applications,
    });
  }
);
export const jobSeekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user.role;
    if (role == "Employer") {
      return next(
        new errorHandler("Not authorized to get the resource !", 400)
      );
    }
    const { _id } = req.user; //_id for mongodb id getting!
    const applications = await Application.find({ "applicantID.user": _id }); //agar job database mai hai toh!
    res.status(200).json({
      sucess: true,
      applications,
    });
  }
);

export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const role = req.user.role;
    if (role == "Employer") {
      return next(
        new errorHandler("Not authorized to get the resource !", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new errorHandler("Application not found !"));
    }
    await application.deleteOne();
    res.status(200).json({
      sucess: true,
      message: "Application delete sucessfully !",
    });
  }
);

// to post application on cloudinary!
export const postApplication = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role == "Employer") {
    return next(new errorHandler("Not authorized to get the resource !", 400));
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    //agar file upld hi nhi ki toh!
    return next(new errorHandler("Resume file is required !"));
  }
  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    //mimetype extension type agar yeh nhi hua toh!
    return next(
      new errorHandler("Invalid file type. Please upload PNG, JPG, WEBP !", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    //uploader.upload for upload file in cloudinary!
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinary.error) {
    console.error(
      "Cloudinary error : ",
      cloudinary.error || "Unknown error bhaiyaa !"
    );
    return next(new errorHandler("Failed to upload resume !", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    //agar job find nhi hue toh!
    return next(new errorHandler("Job not found !", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    //agar detail fetch nhi hue toh!
    return next(new errorHandler("Job not found !", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new errorHandler("Please fill all the details !"));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume:{
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
  });
  res.status(200).json({
    sucess: true,
    message: "Application submitted sucessfully !",
    application,
  })
});
