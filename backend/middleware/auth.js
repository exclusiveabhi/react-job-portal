import { catchAsyncError } from "./catchAsyncError.js"; // Named import
import errorHandler from "./error.js";
import User from "../models/userSchema.js"; // Default import

const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies; // Get token from cookies

  if (!token) {
    // If token is not found
    return next(new errorHandler("User not authorized", 400));
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
    req.user = await User.findById(decoded.id);
    next();
  }
});

export default isAuthorized; // Default export
