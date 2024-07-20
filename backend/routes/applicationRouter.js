import express from "express"
import isAuthorized from "../middleware/auth.js"
import {employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications} from "../controllers/applicationController.js"
const router = express.Router();
router.get("/employer/getall", isAuthorized,employerGetAllApplications)
router.get("/jobseeker/getall", isAuthorized,jobSeekerGetAllApplications)
router.delete("/delete/:id",isAuthorized, jobSeekerDeleteApplication)
export default router;