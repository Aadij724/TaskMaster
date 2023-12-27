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
    designation: {
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
        type: [String],
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
        default: 0,
    },
    totalTasks: {
        type: Number,
        default: 0
    },
    goals: {
        type: [String],
        required: false
    },
    screenTime: {
        type: Number,
        required: false,
    },
    exerciseHours: {
        type: Number,
        required: false,
    },
    schedule: {
        type: {
            "Sunday": {
                type: String,
                default: "Not Set",
            },
            "Monday": {
                type: String,
                default: "Not Set",
            },
            "Tuesday": {
                type: String,
                default: "Not Set",
            },
            "Wednesday": {
                type: String,
                default: "Not Set",
            },
            "Thursday": {
                type: String,
                default: "Not Set",
            },
            "Friday": {
                type: String,
                default: "Not Set",
            },
            "Saturday": {
                type: String,
                default: "Not Set"
            }
        },
        required: false,
    },
    
},{
    timestamps:true
});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;