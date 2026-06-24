const mongoose = require('mongoose');

/**
 * - job description schema: String
 * - resume text: String
 * - Self description: String
 * 
 * MatchScore: Number
 * 
 * -Technical questions: 
 *          [{
 *          questions: "",
 *          intention: "",
 *          answer: ""
 *          }]
 * - Behavioural questions: [{
 *       
 *          questions: "",
 *          intention: "",
 *          answer: ""
 * 
 * }]
 * - Skill gaps:[{
 *        skill: "",
 *        severity : {
 *        type:String, 
 *        enum:["low", "medium","high"]
 *        }
 * 
 * }]
 * 
 * - preparation plan: [{
 * day: Number,
 * focus: String,
 * tasks:[String]
 * }]
 */

const technicalQuestionsSchema= new mongoose.Schema({
    question: {
        type: String,
        required: [true, " Techincal questions is required"]
    },
    intention: {
        type: String,
        required:[true, "Intention is required"]
    },
    answer:{
        type: String, 
        required:[true, "Answer is required"]
    }
},{
    _id: false
})

const behaviouralQuestionsSchema= new mongoose.Schema({
    question: {
        type: String,
        required: [true, " Techincal questions is required"]
    },
    intention: {
        type:String,
        required:[true, "Intention is required"]
    },
    answer:{
        type: String, 
        required:[true, "Answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ["low","medium","high"],
        required: true
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema ({
    day:{
        type: Number,
        required:[true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focs is required"]
    },
    tasks: [{
        type: String,
        required: [ true, " Task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type:String,

    },
    matchScore: {
        type: Number,
        min:0,
        max:100,
    },
    technicalQuestions: [ technicalQuestionsSchema],
    behaviouralQuestions : [behaviouralQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationPlan : [ preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{
    timestamps: true,
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;