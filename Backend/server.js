require("dotenv").config()
const connectedToDB = require("./src/config/database")
const app=require("./src/app")
// const {resume,selfDescription,jobDescription}=require("./src/services/temp")
// const generateInterviewReport=require("./src/services/ai.service")

connectedToDB()
// generateInterviewReport({resume,selfDescription,jobDescription})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})