import applicationRoutes from "../routes/application.routes.js"
import jobRoutes from "../routes/job.routes.js"
import userRoutes from "../routes/user.routes.js"
import express from "express"
const router = express.Router()
router.use("/application", applicationRoutes)
router.use("/user", userRoutes)
router.use("/job", jobRoutes)
export default router