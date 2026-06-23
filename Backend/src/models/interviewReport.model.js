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
    questions: {
        type: STring,
        required: [true, " Techincal questions is required"]
    },
    intention: {
        type:STring,
        required:[true, "Intention is required"]
    },
    answer:{
        type: String, 
        required:[true, "Answer is required"]
    }
},{
    _id: false
})

const BehaviouralQuestionsSchema= new mongoose.Schema({
    questions: {
        type: STring,
        required: [true, " Techincal questions is required"]
    },
    intention: {
        type:STring,
        required:[true, "Intention is required"]
    },
    answer:{
        type: String, 
        required:[true, "Answer is required"]
    }
},{
    _id: false
})

const skilGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        enum:["low","medium","high"],
        required: [true,"Severity is required"]
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema ({
    day:{
        type: Number,
        required:[true, "day is required"]
    },
    focus: {
        type: STring,
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
    behaviouralQuestions : [BehaviouralQuestionsSchema],
    skillGap: [skilGapSchema],
    preparationPlan : [ preparationPlanSchema]
},{
    timestamps: true,
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;