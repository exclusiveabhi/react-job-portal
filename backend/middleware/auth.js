import catchAsyncError from "./catchAsyncError.js"
import errorHandler from "./error.js"
import { User } from "../models/userSchema.js"
const isAuthorized = catchAsyncError(async(req,res,next)=>{
const {token} = req.cookies //cookies se token get kr rehe hai!
if(!token){ //agar token nhi mila toh!
    return next (new errorHandler("User not authorized", 400));
}
else{

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY ); //token verify krwaya hai ki wo meri secret key se generate wala mila hai yah nhi!
    req.user = await User.findById(decoded.id);
    next();
}

})