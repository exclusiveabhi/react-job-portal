import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { Job } from "../models/jobSchema.js";

//Fetch all the jobs!
export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    sucess: true,
    jobs,
  });
});

//Create a jobs!
export const postJob = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role == "Job Seeker") {
    return next(new errorHandler("Not authorized to post the job !", 400));
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if(!title || !description || !category || ! country || !city || !location){
    return next (new errorHandler("Please provide full job details!",400))
  }
  if(!salaryFrom || !salaryTo && !fixedSalary){ //yah to from to provide kre user ya fixedSalary provide kre!
return next(new errorHandler("Please either provide fixed salary or range salary !"))
  }
  if(salaryFrom && salaryTo && fixedSalary){
    return next(new errorHandler("Cannot enter fixed salary and ranged salary together !"))
  }

  //user ki id get ki database mai jo hai !
  const postedBy = req.user._id;

  //yaha database mai create and save ho rhi hai !
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,

  })
  //response chla gya !
res.status(200).json({
    sucess:true,
    message:"Job posted sucessfully !",
    job,
})

});

//employer ki posted all job fetch here !
export const getmyJobs = catchAsyncError(async(req , res ,next)=>{
    const role = req.user.role;
    if (role == "Job Seeker") {
      return next(new errorHandler("Not authorized to get the resource !", 400));
    }
const myJobs =  await Job.find({
    postedBy: req.user._id //jiski id postedBy ke equal hai wo job aayengi bs !

})
res.status(200).json({
    sucess:true,
    myJobs, //jo jobs aayegi wo response mai chli jayegi!
})
})

//to update the posted job !
export const updateJob = catchAsyncError(async(req,res,next)=>{
    const role = req.user.role;
    if (role == "Job Seeker") {
      return next(new errorHandler("Not authorized to get the resource !", 400));
    }
    const {id} = req.params;
    let job = await Job.findById(id) //jo id params se li wo findBYID me de di !
    if(!job){
      return next(new errorHandler("Oops! Job not found !" ,404))
    }
  job  = await Job.findByIdAndUpdate(id , req.body,{ //request mai jo bhi data araha hai wo daal do !
    new: true,
    runValidators: true,
    useFindAndModify: false
  }) 
  res.status(200).json({
    sucess: true,
    message: "Job Updated sucessfully !",
    job,
  })
})
