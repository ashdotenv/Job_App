import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from "./routes/index.routes.js"
import { errorMiddleware } from "./middlewares/error.js"
import cookieParser from "cookie-parser"
dotenv.config({ path: "./config/config.env" })
const app = express()
app.use(cors({
    origin: [process.env.FRONTEND_URL,"http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
app.use("/api/v1", router)
app.use(errorMiddleware)
export default app