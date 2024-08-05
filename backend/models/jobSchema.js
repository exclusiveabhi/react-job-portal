import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide complete details!"],
        minLength: [4, "Title must contain min 4 length"],
        maxLength: [50, "Title does not contain max 50 length!"],
    },
    description:{
        type: String,
        required: [true , "Please provide job description!"],
        minLength: [4 ,"Min length must be more the 4"],
        maxLength: [150, "Provide description under 150 length!"]
    },
    category:{
        type: String,
        required: [true, "Please provide job category!"],

    },
    country:{
        type: String,
        required: [true, "Please provide job country!"],

    },
    city:{
        type: String,
        required: [true, "Please provide job city!"],

    },
    location:{
        type: String,
        required: [true, "Please provide job location!"],
        minLength: [10, "Job location must contains at least 10 character!"],

    },
    fixedSalary:{
        type: Number,
        minLength: [4 , "Fixed Salary cannot contains less then 4 digit!"],
        maxLength: [40 , "Fixed Salary can contain max 9 digit!"],
    },
    salaryFrom:{
        type: Number,
        minLength: [4 , "Salary from cannot contain less then 4 digit!"],
        maxLength: [9 , "Salary from can contain max 9 digit!"], 
    },
    salaryTo:{
        type: Number,
        minLength: [4 , "Salary to cannot contain less then 4 digit!"],
        maxLength: [9 , "Salary to can contain max 9 digit!"],
    },
    expired: {
        type: Boolean,
        default: false,

    },
    jobPostedOn:{
        type: Date,
        default: Date.now(),
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }

})
export const Job = mongoose.model("Job" ,jobSchema)