import express from "express"
import { deleteJob, getAllJobs, getMyJobs, postJob, updateJob } from "../controllers/job.controller.js"
import { isAuthorized } from "../middlewares/auth.js"
const router = express.Router()
router.get("/getalljobs", getAllJobs)
router.post("/post", isAuthorized, postJob)
router.get("/myjobs", isAuthorized, getMyJobs)
router.put("/update/:jobId", isAuthorized, updateJob)
router.delete("/delete/:jobId", isAuthorized, deleteJob)
export default router