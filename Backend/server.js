require("dotenv").config()
const connectedToDB = require("./src/config/database")
const app=require("./src/app")

connectedToDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
