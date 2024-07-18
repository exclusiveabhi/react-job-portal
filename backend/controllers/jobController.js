import {catchAsyncError} from "../middleware/catchAsyncError.js"
import errorHandler from "../middleware/error.js"
import {Job } from "../models/jobSchema.js"

const getAllJobs = catchAsyncError(async(req, res,next)=>{
    
})