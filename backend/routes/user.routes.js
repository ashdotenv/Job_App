import express from "express"
import { Logout, login, register } from "../controllers/user.controller.js"
import { isAuthorized } from "../middlewares/auth.js"
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/logout",isAuthorized, Logout)
export default router