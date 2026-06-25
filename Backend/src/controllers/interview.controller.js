const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description controller to generate report based on user self description, resume and job description. 
 */

async function generateInterviewReportController(req, res) {

 
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text, 
        selfDescription,
        jobDescription
    })

    

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
   
}

/**
 * @description controller to get interview report by interview ID
 */
async function getInterviewReportByIdController(req, res) {
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user:req.user.id})

    if(!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "interview report fetched successfully",
        interviewReport
    })
}


/**
 * @description controller to get all interview report of a user
 */
async function getAllInterviewReport(req,res){
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

/**
 * @description user can delete the file which is no longer needed
 */
const deleteInterviewReport = async (req, res) => {
    const { interviewId } = req.params;

    console.log("Interview ID:", interviewId);
    console.log("Logged in user:", req.user);

    //const report = await interviewReportModel.findById(interviewId);

    

    const report = await interviewReportModel.findOneAndDelete({
        _id: interviewId,
        user: req.user.id
    });

    if (!report) {
        return res.status(404).json({
            message: "Interview report not found"
        });
    }

    res.status(200).json({
        message: "Interview report deleted successfully"
    });
};


module.exports = {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReport, deleteInterviewReport}
