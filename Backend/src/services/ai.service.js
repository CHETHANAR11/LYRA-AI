const {GoogleGenAI} =require("@google/genai")
const {z}=require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai=new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema=z.object({
    matchScore:z.number().describe("The match score between the candidate and the job description"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical question is required"),
        intention:z.string().describe("The intention of interviewer behind the question"),
        answer:z.string().describe("How to answer the question, what points to cover in the answer")
    }))
    .describe("List of technical questions with intention and answer"),
    behavioralQuestions:z.array(z.object({
        question:z.string().describe("The behavioral question for the interview"),
        intention:z.string().describe("The intention of interviewer behind the question"),
        answer:z.string().describe("How to answer the question, what points to cover in the answer")
    }))
    .describe("List of behavioral questions with intention and answer"),
    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill gap identified in the candidate"),
        severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap")
    }))
    .describe("List of skill gaps with severity"),
    preparationPlan:z.array(z.object({
        day:z.number().describe("The day number for the preparation plan"),
        focus:z.string().describe("The focus area for the day"),
        tasks:z.array(z.string()).describe("List of tasks to be completed on the day")
    }))
    .describe("List of preparation plan for the candidate")
})


async function generateInterviewReport({resume,selfDescription,jobDescription}) {
    const prompt=`You are an expert career coach and interviewer. You have been given the 
    following information about a candidate and a job description. Your task is to generate a 
    comprehensive interview report that includes the following sections: match score,
    technical questions, behavioral questions, skill gaps, and a preparation plan for the candidate.
    using following information:
    Candidate Resume: ${resume}
    Candidate Self Description: ${selfDescription}
    Job Description: ${jobDescription}`

    const response= await ai.models.generateContent({
        model:"gemini-3.8-flash",
        contents: prompt,
        config:{
            responseMineType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })
    return JSON.parse(response.text)
}
 

module.exports=generateInterviewReport