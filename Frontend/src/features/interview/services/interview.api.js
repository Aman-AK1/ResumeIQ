import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "", // now hits /api/... on the same domain
    withCredentials: true,
})

/**
 * @description service to generate interview report based on user self description, resume and job description
 */
export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile})=>{
 const formData = new FormData()
 formData.append("jobDescription", jobDescription);
 formData.append("selfDescription",selfDescription)
 formData.append("resume",resumeFile)
 console.log(formData.get("resume"));
 const response = await api.post("/api/interview", formData,{
    headers: {
        "Content-Type": "multipart/form-data"
    }
 })

 return response.data
}

/**
 * @description service to get intervieew report by interview ID
 */
export const getInterviewReportById =async (interviewId)=> {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}

/**
 * @description service to get all interview reports of logged in user 
 */
export const getAllInterviewReports = async () =>{
    const response = await api.get("/api/interview")
    return response.data
}

/**
 * @description Delete interview report by ID
 */
export const deleteInterviewReport = async (interviewId) => {
    const response = await api.delete(`/api/interview/${interviewId}`);

    return response.data;
};


/**
 * @description service to generate resme pdf based on user self description, resume and job description 
 */
export const generateResumePdf= async ({interviewId})=>{
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`, null, {
        responseType:"blob"
    })

    return response.data
}