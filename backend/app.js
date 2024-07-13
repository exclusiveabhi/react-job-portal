import express from 'express'
import dotenv  from 'dotenv'; //app mai import kr li!
import cors from "cors"
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

dotenv.config({path:"./config/config.env"}) //env file ka path diya hai yaha!
const app = express();

app.use(cors({  //yeh cors ka setup hai!
    origin: [process.env.FRONTEND_URL],  //for connecting frontend and backend!
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(cookieParser()); //cookie yaha use kr liya for auth!
app.use(fileUpload) //resume upld ke liyee!

//data ko json mai lene ke liyee!
app.use(express.json());
app.use(express.urlencoded({extended:true})) //string ko json mai convert kr deta hai simple!







export default app;


