import { catchAsyncError } from "../middlewares/catchAsyncerror.js";
import { Application } from "../models/application.model.js";

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
        return (new ErrorHandler("Employeer is not allowed to ", 400))
    }

})