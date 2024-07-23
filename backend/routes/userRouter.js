import express from "express"
import {getUser, login, logout, register} from "../controllers/userController.js"
import isAuthorized from "../middleware/auth.js"
const router = express.Router();
//router express se use kiya method post hai! //register mtlb funtion ko run krrehe!
router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthorized, logout) //isAuthorized means user ke pass agar cookie nhi hogi toh logout nhi kr sakta !
router.get("/getuser", isAuthorized, getUser)
export default router;