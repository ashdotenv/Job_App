import { catchAsyncError } from "../middlewares/catchAsyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/job.model.js";

export const getAllJobs = catchAsyncError(async function (req, res, next) {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs
    });
});

export const postJob = catchAsyncError(async function (req, res, next) {
    const { role } = req.user
    if (role === "Job Seeker") {
        return (new ErrorHandler("Job Seeker is not allowed to Post Job", 400))
    }
    const { title, description, category, country, city, location, salaryFrom,
        salaryTo, fixedSalary } = req.body
    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Provide all Job details", 400))
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Provide fixed salary or salary range", 400))
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Salary can only be in range or fixed ", 400))
    }
    const postedBy = req.user._id
    const newJob = await Job.create({
        title: title,
        description: description,
        category: category,
        country: country,
        city: city,
        location: location,
        fixedSalary: fixedSalary,
        salaryTo: salaryFrom,
        salaryFrom: salaryFrom,
        postedBy: postedBy
    })
    return res.status(200).json({
        success: true,
        message: "Job Posted successfully",
        job: newJob
    })
})
export const getMyJobs = catchAsyncError(async function (req, res, next) {
    const id = req.user._id
    const { role } = req.user
    if (role === "Job Seeker") {
        return (new ErrorHandler("Job Seeker is not allowed", 400))
    }
    const myJobs = await Job.find({ postedBy: id })
    res.status(200).json(
        {
            success: true,
            myJobs
        })
})
export const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const { jobId } = req.params;
    let job = await Job.findById(jobId);
    if (!job) {
        return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    job = await Job.findByIdAndUpdate(jobId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true, job,
        message: "Job Updated!",
    });
});

export const deleteJob = catchAsyncError(async function (req, res, next) {
    const { jobId } = req.params;
    let job = await Job.findById(jobId);
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }
    if (job.postedBy.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("OOPS! You cannot delete this job.", 403));
    }
    await job.deleteOne()
    res.status(200).json({
        success: true,
        message: "Job Deleted Successfully"
    })
})