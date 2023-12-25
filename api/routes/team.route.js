const express = require("express");
const isAuth = require("../middleware/isAuthenticated");
const Team = require("../models/team.model.js");
const Task = require("../models/task.model.js");
const User = require("../models/user.model.js");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/:teamid", async (req,res) => {    
    try {
        const team = await Team.findById(req.params.teamid);
        res.status(200).json(team);
        console.log("At backend get team: ",team)
    } catch (err) {
        console.log("Some err at get team",err);
    }
} );


router.post("/", async(req,res) => {

    const newTeam = new Team({
        name: req.body.name,
        details: req.body.details,
        estTime: req.body.estTime,
        skillsReq: req.body.skillsReq,
        teamMem: req.body.teamMem,
        progress: 0,
    });

    try {
        const savedTeam = await newTeam.save();
        res.status(200).json(savedTeam);
    } catch (err) {
        res.send(err).status(500);
    }
});

router.put( "/:teamid/task/:taskid/assign", isAuth, async (req,res) => {
    const assignTo = req.body.assignTo;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            {id: req.params.taskid},
            {
                $set: { userId: assignTo }
            },
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (err) {
        res.send(err);
    }
        
})


router.get("/availableEmps", async(req,res) => {
    try {
        const availableEmps = await User.find({available:true});
        res.status(200).json(availableEmps);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.get("/:teamid/tasks", async(req,res) => {
    try {
        const tasks = await Task.find({teamId: req.params.teamid});
        console.log("At backend tasks loaded for team",tasks);
        res.status(200).json(tasks);
    } catch (err) {
        console.log("Error in finding team tasks ",err);
        res.status(500).send(err);
    }
})

module.exports = router;