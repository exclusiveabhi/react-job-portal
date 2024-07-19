export const catchAsyncError = (thefunction) => { // User controller ka error catch hoga yaha!
    return (req, res, next) => {
      Promise.resolve(thefunction(req, res, next)).catch(next);
    };
  };
  