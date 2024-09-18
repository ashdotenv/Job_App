import mongoose from "mongoose";
import validator from "validator";
const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenghth: [3, "Name must contain at least 3 characters "],
        minLenghth: [30, "Name cannot contain  30 characters "],
    },
    email: {
        type: String,
        required: [true, "Pleas provide your email"],
        validator: [validator.isEmail, "Please provide valid Email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your cover letter"],
    },
    phone: {
        type: Number,
        required: [true, "Please provide your Phone no."],
    },
    address: {
        type: String,
        required: [true, "Please provide your Address"],
    },
    resume: {
        public_id: {
            required: true,
            tpye: String,
        },
        url: {
            type: String,
            required: true
        },
        applicantId: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    },
    role: {
        required: true
        , type: String,
        emum: ["Job Seeker"]
    },
    employeerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            required: true
            , type: String,
            emum: ["Employeer"]
        }
    }
})
export const Application = mongoose.model("Applicatoin", applicationSchema)