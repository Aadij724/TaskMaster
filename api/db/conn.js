const mongoose = require("mongoose");

const DB = MONGO = "mongodb+srv://Aadi:Aadimongodb@cluster0.bin58da.mongodb.net/?retryWrites=true&w=majority&dbname=task-management-system";

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((err)=>console.log("errr",err))