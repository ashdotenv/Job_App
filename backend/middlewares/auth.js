import { User } from "../models/user.model.js";
import { catchAsyncError } from "./catchAsyncerror.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken'
export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler("User Not Authorized", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})