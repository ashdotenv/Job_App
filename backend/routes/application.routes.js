import express from "express"
import { employeerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplicatoins, postApplication, } from "../controllers/application.controller.js"
import { isAuthorized } from "../middlewares/auth.js"
const router = express.Router()
router.get("/employeer/getall", employeerGetAllApplications)
router.get("/jobseekber/getall", isAuthorized, jobSeekerGetAllApplicatoins)
router.post("/post", isAuthorized, postApplication)
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication)
export default router