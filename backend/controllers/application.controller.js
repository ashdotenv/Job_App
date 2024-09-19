import { application } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncerror.js";
import { Application } from "../models/application.model.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary"
import { Job } from "../models/job.model.js";

export const employeerGetAllApplications = catchAsyncError(async function (req, res, next) {
    const { role } = req.user
    if (role === "Job Seeker") {
        return (new ErrorHandler("Job Seeker is not allowed to access employeer Applications", 400))
    }
    const { _id } = req.user
    const applications = await Application.find({ "employeerId.user": _id })
    res.status(200).json({
        success: true,
        applications
    })
}
)

export const jobSeekerGetAllApplicatoins = catchAsyncError(async function (req, res, next) {
    const { role } = req.user
    if (role === "Employeer") {
        return (new ErrorHandler("Employeer is not allowed to get Job Seekers Applications  ", 400))
    }
    const { _id } = req.user
    const applications = await Application.find({ "applicantId.user": _id })
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobSeekerDeleteApplication = catchAsyncError(async function (req, res, next) {
    const { role } = req.user
    if (role === "Employeer") {
        return (new ErrorHandler("Employeer is not allowed to Delete Job Seekers Application", 400))
    }
    const { id } = req.params
    const application = Application.findById(id)
    if (!application) {
        return next(new ErrorHandler("Application not Found", 400))
    }
    await application.deleteOne()
    res.status(200).json({
        message: "Application Delete Successfully"
    })
})
export const postApplication = catchAsyncError(async function (req, res, next) {
    const { role } = req.user;

    if (role === "Employeer") {
        return next(new ErrorHandler("Employeer is not allowed to get Job Seekers Applications", 400));
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume is required", 400));
    }

    const { resume } = req.files;
    const allowedFormat = ["image/png", "image/jpg", "image/webp"];
    if (!allowedFormat.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid FileType, only png, jpg, and webp are supported"));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Failed to upload resume", 500));
    }

    const { name, email, coverLetter, address, phone, jobId } = req.body;
    const applicantId = req.user._id;  // Use the user's ObjectId directly

    if (!jobId) {
        return next(new ErrorHandler("Please provide Job Id", 404));
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found", 404));
    }

    const employeerId = jobDetails.postedBy;  // Use the employer's ObjectId directly

    if (!name || !email || !coverLetter || !phone || !address || !resume) {
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    const application = await Application.create({
        name: name,
        email: email,
        coverLetter: coverLetter,
        phone: phone,
        address: address,
        applicantId: applicantId,
        employeerId: {
            user: employeerId
            , role: "Employeer"
        },
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        role: role
    });

    res.status(200).json({ message: "Application submitted", application, success: true });
});
