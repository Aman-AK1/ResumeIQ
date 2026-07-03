const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

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

        jobTitle: {
            type: "string"
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behaviouralQuestions",
        "skillGaps",
        "preparationPlan",
        "jobTitle"
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

    jobTitle: z.string()
});

// async function generateInterviewReport({
//     Resume,
//     SelfDescription,
//     JobDescription
// }) {

//     const prompt = `
// Generate a complete interview preparation report.

// Requirements:
// - Determine the most suitable job title for the candidate based on the resume and job description.
// - Return it as "jobTitle".
// - Generate exactly 5 technical questions.
// - Generate exactly 3 behavioral questions.
// - Generate at least 3 skill gaps.
// - Generate a complete 7-day preparation plan.
// - Each day must contain at least 3 tasks.
// - Return ONLY valid JSON.
// - Follow the schema exactly.

// Resume:
// ${Resume}

// Self Description:
// ${SelfDescription}

// Job Description:
// ${JobDescription}
// `;

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: interviewReportJsonSchema
//         }
//     });
//     const report = JSON.parse(response.text);


//     const validatedReport =
//         interviewReportSchema.parse(report);


//     return validatedReport;
// }

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
Generate a complete interview preparation report.

Requirements:
- Determine the most suitable job title for the candidate based on the resume and job description.
- Return it as "jobTitle".
- Generate exactly 5 technical questions.
- Generate exactly 3 behavioral questions.
- Generate at least 3 skill gaps.
- Generate a complete 7-day preparation plan.
- Each day must contain at least 3 tasks.
- Return ONLY valid JSON.
- Follow the schema exactly.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const MODELS = [
        "gemini-3-flash-preview",
        "gemini-2.5-flash",
        "gemini-3.1-flash-lite"
    ];

    let lastError;

    for (const model of MODELS) {
        try {
            console.log(`Trying model: ${model}`);

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: interviewReportJsonSchema
                }
            });

            console.log(`Success with model: ${model}`);

            const report = JSON.parse(response.text);

            const validatedReport = interviewReportSchema.parse(report);

            return validatedReport;

        } catch (err) {

            console.error(`Model ${model} failed.`);
            console.error(err.message);

            lastError = err;

            const status =
                err?.status ||
                err?.error?.code ||
                err?.cause?.status;

            const isTemporaryError =
                status === 503 ||
                status === 429 ||
                err.message?.includes("fetch failed") ||
                err.message?.includes("ECONNRESET") ||
                err.message?.includes("ETIMEDOUT");

            if (isTemporaryError) {
                console.log("Temporary error. Trying next model...\n");

                // wait 1 second before trying next model
                await new Promise(resolve => setTimeout(resolve, 1000));

                continue;
            }

            // Invalid API key, invalid schema, invalid model, etc.
            throw err;
        }
    }

    throw lastError;
}

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "domcontentloaded" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

// async function generateResumePdf({
//     Resume,
//     SelfDescription,
//     JobDescription}){
//         const resumePdfSchema = z.object({
//             html: z.string().describe("The HTML content of the resume which can be converted to PDF using any libarary like puppeteer ")
//         })

//         const prompt = `Generate resume for a candidate with the following details:
//          Resume:
// ${Resume}

// Self Description:
// ${SelfDescription}

// Job Description:
// ${JobDescription}
// the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library
// `
// const response = await ai.models.generateContent({

// })
//     }

// async function generateResumeData({ resume, selfDescription, jobDescription }) {

//     const resumeJsonSchema = {

//         type: "object",

//         properties: {

//             name: { type: "string" },

//             title: { type: "string" },

//             email: { type: "string" },

//             phone: { type: "string" },

//             linkedin: { type: "string" },

//             github: { type: "string" },

//             summary: { type: "string" },

//             skills: {

//                 type: "array",

//                 items: { type: "string" }

//             },

//             experience: {

//                 type: "array",

//                 items: {

//                     type: "object",

//                     properties: {

//                         company: { type: "string" },

//                         role: { type: "string" },

//                         duration: { type: "string" },

//                         description: { type: "string" }

//                     }

//                 }

//             },

//             education: {

//                 type: "array",

//                 items: {

//                     type: "object",

//                     properties: {

//                         degree: { type: "string" },

//                         college: { type: "string" },

//                         year: { type: "string" }

//                     }

//                 }

//             },

//             projects: {

//                 type: "array",

//                 items: {

//                     type: "object",

//                     properties: {

//                         title: { type: "string" },

//                         description: { type: "string" }

//                     }

//                 }

//             }

//         }

//     }

    

//     const prompt = `Generate resume for a candidate with the following details:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}
// Generate a professional resume.

// Return ONLY JSON.

// Do not generate HTML.

// Do not generate CSS.

// The response must follow the schema exactly.

// Tailor the resume according to the job description.

// Rewrite the resume professionally while preserving truthful information.

// Do not invent fake experience.
// `

//     const MODELS = [
//         "gemini-3-flash-preview",
//         "gemini-2.5-flash",
//         "gemini-3.1-flash-lite"
//     ];

//     let lastError;

//     for (const model of MODELS) {
//         try {
//             console.log(`Trying model: ${model}`);

//             const response = await ai.models.generateContent({
//                 model,
//                 contents: prompt,
//                 config: {
//                     responseMimeType: "application/json",
//                     responseSchema: resumeJsonSchema,
//                 }
//             });

//             console.log(`Success with model: ${model}`);

//             const jsonContent = JSON.parse(response.text);

            

//             return jsonContent;

        

//         } catch (err) {

//             console.error(`Model ${model} failed.`);
//             console.error(err.message);

//             lastError = err;

//             const status =
//                 err?.status ||
//                 err?.error?.code ||
//                 err?.cause?.status;

//             const isTemporaryError =
//                 status === 503 ||
//                 status === 500 ||
//                 status === 502 ||
//                 status === 429 ||
//                 err.message?.includes("fetch failed") ||
//                 err.message?.includes("ECONNRESET") ||
//                 err.message?.includes("ETIMEDOUT");

//             if (isTemporaryError) {
//                 console.log("Temporary error. Trying next model...\n");

//                 await new Promise(resolve => setTimeout(resolve, 1000));

//                 continue;
//             }

//             throw err;
//         }
//     }

//     throw lastError;
// }

async function generateResumeData({ resume, selfDescription, jobDescription }) {


    const resumeJsonSchema = {
    type: "object",

    properties: {

        name: { type: "string" },

        title: { type: "string" },

        email: { type: "string" },

        phone: { type: "string" },

        location: { type: "string" },

        linkedin: { type: "string" },

        github: { type: "string" },

        portfolio: { type: "string" },

        summary: { type: "string" },

        technicalSkills: {

            type: "object",

            properties: {

                languages: {
                    type: "array",
                    items: { type: "string" }
                },

                frontend: {
                    type: "array",
                    items: { type: "string" }
                },

                backend: {
                    type: "array",
                    items: { type: "string" }
                },

                databases: {
                    type: "array",
                    items: { type: "string" }
                },

                tools: {
                    type: "array",
                    items: { type: "string" }
                }

            },  required:[
        "languages",
        "frontend",
        "backend",
        "databases",
        "tools"
    ]

        },

        experience: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    company: { type: "string" },

                    role: { type: "string" },

                    duration: { type: "string" },

                    location: { type: "string" },

                    description: {

                        type: "array",

                        items: { type: "string" }

                    }

                }, 
                required:[
    "company",
    "role",
    "duration",
    "location",
    "description"
]

            }

        },

        projects: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    title: { type: "string" },

                    technologies: {

                        type: "array",

                        items: { type: "string" }

                    },

                    description: {

                        type: "array",

                        items: { type: "string" }

                    }

                }, required:[
    "title",
    "technologies",
    "description"
]

            }

        },

        education: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    degree: { type: "string" },

                    college: { type: "string" },

                    year: { type: "string" },

                    cgpa: { type: "string" }

                }, required:[
    "degree",
    "college",
    "year",
    "cgpa"
]

            }

        },

        certifications: {

            type: "array",

            items: { type: "string" }

        },

        achievements: {

            type: "array",

            items: { type: "string" }

        },

        languages: {

            type: "array",

            items: { type: "string" }

        }

    }, 
    required: [
    "name",
    "title",
    "email",
    "phone",
    "location",
    "linkedin",
    "github",
    "portfolio",
    "summary",
    "technicalSkills",
    "experience",
    "projects",
    "education",
    "certifications",
    "achievements",
    "languages"
]
}

    const resumeSchema = z.object({

    name: z.string(),

    title: z.string(),

    email: z.string().default(""),

    phone: z.string().default(""),

    location: z.string().optional(),

    linkedin: z.string().optional(),

    github: z.string().optional(),

    portfolio: z.string().optional(),

    summary: z.string(),

    technicalSkills: z.object({

        languages: z.array(z.string()).default([]),

        frontend: z.array(z.string()).default([]),

        backend: z.array(z.string()).default([]),

        databases: z.array(z.string()).default([]),

        tools: z.array(z.string()).default([])

    }),

    experience: z.array(

        z.object({

            company: z.string(),

            role: z.string(),

            duration: z.string(),

            location: z.string().optional(),

            description: z.array(z.string()).default([])

        })

    ).default([]),

    projects: z.array(

        z.object({

            title: z.string(),

            technologies: z.array(z.string()).default([]),

            description: z.array(z.string()).default([])

        })

    ).default([]),

    education: z.array(

        z.object({

            degree: z.string(),

            college: z.string(),

            year: z.string(),

            cgpa: z.string().optional()

        })

    ).default([]),

    certifications: z.array(z.string()).default([]),

    achievements: z.array(z.string()).default([]),

    languages: z.array(z.string()).default([])
});

    const prompt = `
Generate a professional ATS-friendly resume.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Generate a professional ATS-friendly resume.

Use ONLY information that can be inferred from:

Resume
Self Description
Job Description

Requirements:

- Return ONLY valid JSON.
- Never generate HTML.
- Never generate CSS.
- Never invent fake experience.
- also create a headline
- Rewrite existing information professionally.
- Tailor the resume toward the supplied job description.
- Categorize technical skills into:
  - Languages
  - Frontend
  - Backend
  - Databases
  - Tools
- Write concise but impactful project descriptions.
- Write 3–5 bullet points for each experience/project where appropriate.
- If information is missing, return an empty string or empty array instead of "undefined".
-Never omit any field.

Every field defined in the response schema MUST be returned.

If a value is unavailable:

- return "" for strings
- return [] for arrays
- return {} for objects

Do not omit keys.
`;

    const MODELS = [
        "gemini-3.5-flash",
        "gemini-2.5-flash",
        "gemini-3.1-flash-lite"
    ];

    let lastError;

    for (const model of MODELS) {

        try {

            console.log(`Trying model: ${model}`);

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: resumeJsonSchema
                }
            });

            console.log(`Success with model: ${model}`);

// const fs = require("fs");

// // Check what Gemini returned
// console.log("Type:", typeof response.text);
// console.log("Length:", response.text?.length);

// fs.writeFileSync("gemini-response.txt", response.text || "");

// console.log("Response saved.");

const jsonContent = JSON.parse(response.text);

// require("fs").writeFileSync(
//     "parsed.json",
//     JSON.stringify(jsonContent,null,2)
// );

            const validatedResume = resumeSchema.parse(jsonContent);

            return validatedResume;

        } catch (err) {

            console.error(`Model ${model} failed.`);
            console.error(err.message);

            lastError = err;

            const status =
                err?.status ||
                err?.error?.code ||
                err?.cause?.status;

            const isTemporaryError =
                status === 503 ||
                status === 500 ||
                status === 502 ||
                status === 429 ||
                err.message?.includes("fetch failed") ||
                err.message?.includes("ECONNRESET") ||
                err.message?.includes("ETIMEDOUT");

            if (isTemporaryError) {

                console.log("Temporary error. Trying next model...\n");

                await new Promise(resolve => setTimeout(resolve, 1000));

                continue;
            }

            throw err;
        }
    }

    throw lastError;
}

module.exports = { generateInterviewReport, generateResumeData };