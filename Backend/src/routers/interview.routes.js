const express=require("express")
const authMiddleware=require("../middlewares/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")

const interviewRouter=express.Router()

/**
 * @route POST /api/interview
 * @desc Generate interview report based on resume, self-description, and job description
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview
 * @desc Get all interview reports of logged in user
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

/**
 * @route GET/api/interview/resume/pdf
 * @description Generate resume pdf based on user self description, resume content and job description
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)
 
module.exports=interviewRouter 