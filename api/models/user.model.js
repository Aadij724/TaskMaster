const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: false
    },
    accessToken: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false,
    },
    teamId: {
        type: String,
        required: true,
    },
    productivity: {
        type: Number,
        required: false,
    },
    skills:{
        type: [String],
        required: false,
    },
    available: {
        type: Boolean,
        required: true,
    },
    hobies: {
        type: [
            {
                hobieName: String,
                preferredTimeSpend: Number,
            }
        ],
        required: false
    },
    tasks: {
        type: [String],
        required: false,
    },
    sleepHours: {
        type: Number,
        required: false,
    },
    freeHours: {
        type: Number,
        required: false,
    },
    officeHours: {
        type: Number,
        required: false,
    },
    extraOfficeHours:{
        type: Number,
    },
    hobieHours: {
        type: Number,
        required: false,
    },
    tasksCompleted: {
        type: Number,
    },
    goals: {
        type: [
            {
                goalName: String,
                timeReqHours: Number,
                goalProgress: Number
            }
        ],
        required: false
    }
    
},{
    timestamps:true
});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;