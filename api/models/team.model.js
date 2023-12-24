const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teamMem: {
        type: [String],
        required: true
    },
    lead: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false,
    },
    skillsReq: {
        type: [String],
        required: false,
    },
    estTime:{
        type: Number,
        required: false,
    },
    topPerformer: {
        type: [String],
        required: false
    },
    tasks: {
        type: [String],
        required: false
    },
    progress: {
        type: Number,
        required: false,
    }
    
},{
    timestamps:true
});

const teamdb = new mongoose.model("teams",teamSchema);

module.exports = teamdb;