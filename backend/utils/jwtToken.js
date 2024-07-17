export const sendToken = (user ,statusCode , res , message)=>{
    const token = user.getJWTtoken(); //getJWTtoken function ko call kiya userSchema mai define hai yeh!
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 * 1000 //cookie expire time yaha pr hai!
        ),
        httpOnly: true,  //agar https pr api deplopy ho toh  httpOnly: true iski jagha secure: true hoga!
    }
res.status(statusCode ).cookie("token" , token, options).json({ //json mai response.status mai chla gya!
    sucess: true,
    user,
    message,
    token,
})
}