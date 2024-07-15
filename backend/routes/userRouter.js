import express from "express"
import {register} from "../controllers/userController.js"
const router = express.Router();
//router express se use kiya method post hai! //register mtlb funtion ko run krrehe!
router.post("/register", register)
export default router;