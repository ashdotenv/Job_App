import { catchAsyncError } from "../middlewares/catchAsyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Fill in all fields properly"))
    }
    const isEmail = await User.findOne({ email: email });
    console.log(isEmail);
    if (isEmail) {
        return next(new ErrorHandler("Email Already Exist"))
    }
    const user = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role
    })

    generateToken(user, 200, "User registered Successfully", res)

})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide Email Password and Role", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Email or Password is invalid", 400))
    }
    const isPasswordMatch = user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Email or Password is invalid", 400))
    }
    if (user.role !== role) {
        return next(new ErrorHandler("User Role doesn't Match", 400))

    }
    generateToken(user, 200, "User Logged In Successfully", res)
})

export const Logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logged Out"
    })
})