import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        minlength: [3, "Name must contain at least 3 characters"],
        maxlength: [30, "Name cannot contain more than 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your cover letter"],
    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone number"],
    },
    address: {
        type: String,
        required: [true, "Please provide your address"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker"]
    },
    employeerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["Employeer"]
        }
    }
});
export const Application = mongoose.model("Application", applicationSchema);
