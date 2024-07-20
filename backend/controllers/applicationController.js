import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { Application } from "../models/applicationSchema.js";
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
    const {role} = req.user.role;
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

export const jobSeekerDeleteApplication = catchAsyncError(async(req,res,next)=>{
    const role = req.user.role;
    if (role == "Employer") {
      return next(
        new errorHandler("Not authorized to get the resource !", 400)
      );
    }
    const {id} = req.params;
    const application = await Application.findById(id);
if(!application){
    return next (new errorHandler("Application not found !"))
}
 await application.deleteOne();
 res.status(200).json({
    sucess:true,
    message: "Application delete sucessfully !"
 })

})