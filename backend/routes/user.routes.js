import express from "express"
import { Logout, getUser, login, register } from "../controllers/user.controller.js"
import { isAuthorized } from "../middlewares/auth.js"
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthorized, Logout)
router.get("/getUser", isAuthorized, getUser)
export default router