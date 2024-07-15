export const catchAsyncError = (thefunction)=>{ //userController ka error catch hoga yaha!
    return (req,res,next)=>{
Promise.resolve(thefunction(req,res,next)).catch(next);
    }
}