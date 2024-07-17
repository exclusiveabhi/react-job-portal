import express from "express"
import {login, register} from "../controllers/userController.js"
const router = express.Router();
//router express se use kiya method post hai! //register mtlb funtion ko run krrehe!
router.post("/register", register)
router.post("/login", login)
export default router;