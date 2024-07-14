import express from 'express'
import dotenv  from 'dotenv'; //app mai import kr li!
import cors from "cors"
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import dbConnection from "./database/dbConnection.js"
import errorMiddleware from "./middleware/error.js"

dotenv.config({path:"./config/config.env"}) //env file ka path diya hai yaha!
const app = express();

app.use(cors({  //yeh cors ka setup hai!
    origin: [process.env.FRONTEND_URL],  //for connecting frontend and backend!
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(cookieParser()); //cookie yaha use kr liya for auth!
 //resume upld ke liyee!
app.use(fileUpload({
useTempFiles: true,
tempFileDir: '/tmp/',
}))

//data ko json mai lene ke liyee!
app.use(express.json());
app.use(express.urlencoded({extended:true})) //string ko json mai convert kr deta hai simple!


//routes yaha pe hai!
app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRouter)

dbConnection(); //database ke connection ke liyee call kiya!



//error middleware end mai use krna hai sequence hai yeh!
app.use(errorMiddleware)


export default app;


