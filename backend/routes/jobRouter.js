import express from "express"
import isAuthorized from "../middleware/auth.js"
import {getAllJobs, getmyJobs, postJob,updateJob} from "../controllers/jobController.js"
const router = express.Router();
router.get("/getall" , getAllJobs)  
router.post("/post", isAuthorized ,postJob)
router.get("/getalljob", isAuthorized ,getAllJobs)
router.put("/update/:id", isAuthorized ,updateJob) ///:id is param mtlb id define kregi konsi job update krni hai!
export default router;