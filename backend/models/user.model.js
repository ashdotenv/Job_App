import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide your name"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [30, "Name can't be more than 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Provide your name"],
        validate: [validator.isEmail, "Please Provide valid Email"]
    },
    phone: {
        type: Number,
        required: [true, "Please Provide your Phone Number"]
    },
    password: {
        minLength: [8, "Name must be at least 3 characters"],
        type: String,
        maxLength: [32, "Name can't be more than 30 characters"],
        required: [true, "Please Provide your password"],
        select: false
    }
    , role: {
        type: String,
        required: [true, "Please Provide your role"]
        , enum: ["Job Seeker", "Employeer"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

export const User = mongoose.model("User", userSchema)