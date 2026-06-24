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

module.exports = interviewRouter