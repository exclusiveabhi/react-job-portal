import catchAsyncError from "./catchAsyncError.js"
import errorHandler from "./error.js"
import User from "../models/userSchema.js"
export const register = catchAsyncError(async(req,res,next)=>{  //user kya kya krega!
   const {name ,email ,phone, role, password} = req.body; //frontend se yeh 5 data ayega!
   if(!name || !email || !phone || !role || !password){ //agar yeh missing ho koi sa bhi!
return next(new errorHandler("Provide your complete detail !"))
   }
   const isEmail = await User.findOne({email})
   if(isEmail){
    return next(new errorHandler("Email already exists!"))
   }
   else{
    const user  = await User.create({
      name,
      email,
      phone,
      role,
      password,
    })
    res.status(200).json({
      sucess:true,
      message: "User Registered",
      user, //yaha user [uppar jo banaya wo chla gya]
    })
   }
})
