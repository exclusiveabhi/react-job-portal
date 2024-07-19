export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTtoken(); // Call getJWTtoken function
    console.log('Generated Token:', token); // Debug token generation
  
    // Check environment variables
    console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
    console.log('COOKIE_EXPIRE:', process.env.COOKIE_EXPIRE);
    console.log('NODE_ENV:', process.env.NODE_ENV);
  
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // cookie expire time
      secure: process.env.NODE_ENV === 'production', // secure flag set based on environment
      httpOnly: true,  // httpOnly flag set
    };
  
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };
  