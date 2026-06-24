const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportJsonSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number",
            description: "A score between 0 and 100 indicating candidate-job match"
        },

        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },

        behaviouralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },

        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },

        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: {
                        type: "array",
                        items: { type: "string" }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },

        title: {
            type: "string"
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behaviouralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ).min(5),

   behaviouralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ).min(3),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ).min(3),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string()).min(3)
        })
    ).length(7),

    title: z.string()
});

async function generateInterviewReport({
    Resume,
    SelfDescription,
    JobDescription
}) {

    const prompt = `
Generate a complete interview preparation report.

Requirements:
- Generate exactly 5 technical questions.
- Generate exactly 3 behavioral questions.
- Generate at least 3 skill gaps.
- Generate a complete 7-day preparation plan.
- Each day must contain at least 3 tasks.
- Return ONLY valid JSON.
- Follow the schema exactly.

Resume:
${Resume}

Self Description:
${SelfDescription}

Job Description:
${JobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportJsonSchema
        }
    });

    const report = JSON.parse(response.text);

    const validatedReport =
        interviewReportSchema.parse(report);

    

    return validatedReport;
}

module.exports = generateInterviewReport;