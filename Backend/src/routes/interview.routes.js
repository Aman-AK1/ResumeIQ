const express = require ("express");
const authMiddelware  = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description
 * @access private
 */
interviewRouter.post("/",authMiddelware.authUser, upload.single("resume"), interviewController.generateInterviewReportController )

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddelware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get("/", authMiddelware.authUser, interviewController.getAllInterviewReport)

/**
 * @route DELETE /api/interview/:interviewId
 * @description deleted specific file by interviewId
 * @access private 
 */
interviewRouter.delete("/:interviewId", authMiddelware.authUser, interviewController.deleteInterviewReport)

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddelware.authUser,interviewController.generateResumePdfController)


module.exports = interviewRouter