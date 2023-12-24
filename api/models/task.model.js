const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    details: {
        type: String,
        required: false,
    },
    deadline:{
        type: Date,
        required: false,
    },
    skillsReq: {
        type: [String],
        required: false,
    },
    estimatedTimeReq: {
        type: Number,
        required: false,
    },
    teamId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: false,
    },
    actualTimeTaken: {
        type: Number,
        required: false,
    },
    completedBy: {
        type: String,
        required: false,
    },
    completedAt: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: true,
        eval: ["ongoing", "completed", "toBeDone"],
    },
    
},{
    timestamps:true
});

const taskdb = new mongoose.model("tasks",taskSchema);

module.exports = taskdb;