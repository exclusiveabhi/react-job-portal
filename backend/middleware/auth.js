import { catchAsyncError } from "./catchAsyncError.js"; // Named import
import errorHandler from "./error.js";
import User from "../models/userSchema.js"; // Default import
import jwt from 'jsonwebtoken'; // Ensure jwt is imported

const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies; // Get token from cookies
// console.log(token)

  if (!token) {
    // If token is not found
    return next(new errorHandler("User not authorized by token !", 400));
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
    req.user = await User.findById(decoded.id); // Finding user in database by id
    if (!req.user) {
      return next(new errorHandler("User not found", 404)); // User not found
    }
    next();
  }
});

export default isAuthorized; // Default export
