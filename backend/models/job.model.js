import mongoose, { Mongoose } from "mongoose";
export const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide job title"],
        minLength: [3, "Job Title must have at least 3 Characters"]
        , maxLength: [50, "Job Title can't exceed 50 chrarcters"]
    },
    description: {
        type: String,
        required: [true, "Please provide job Description"],
        minLength: [50, "Job description must have at least 3 Characters"]
        , maxLength: [450, "Job description can't exceed 50 chrarcters"]
    },
    category: {
        type: String,
        required: [true, "Please provide job Category"],
    },

    country: {
        type: String,
        required: [true, "Please provide job Country"],
    },
    city: {
        type: String,
        required: [true, "Please provide job city"],
    },

    location: {
        type: String,
        required: [true, "Please provide Exact Location"],
        minLength: [50, "Job Location Must contain at least 50 characters "]
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Job Salary  Must be at least 4 digits "],
        minLength: [9, "Job Salary  can't exceed more than 9 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary from  Must be at least 4 digits "],
        minLength: [9, "Salary from can't exceed more than 9 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary from  Must be at least 4 digits "],
        minLength: [9, "Salary from can't exceed more than 9 digits"],
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "User",
        required: true
    }
})

export const Job = mongoose.model("Job", jobSchema)