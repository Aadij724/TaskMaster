const express = require("express");
const isAuth = require("../middleware/isAuthenticated");
const Team = require("../models/team.model.js");
const Task = require("../models/task.model.js");

const router = express.Router();

router.get("/:teamid", isAuth, async (req,res) => {
    const teamId = req.user.teamId;
    
    try {
        const team = await Team.findById(teamId);
        res.status(200).json(team);
    } catch (err) {
        console.log("Some err at get team");
    }
} );


router.post("/", isAuth, async(req,res) => {

    const newTeam = new Team({
        name: req.body.projectName,
        details: req.body.projectDetails,
        estTime: req.body.estTime,
        skillsReq: req.body.skillsReq,
        teamMem: req.body.team,
        tasks: req.body.tasks,
        progress: 0,
        lead: req.user._id,
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

router.post("/:teamid/task", isAuth, async (req,res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            details: req.body.details,
            status: "tobedone",
            teamId: req.params.teamid
        });

        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        console.log(err);
        res.status(200).send(err);
    }
})

module.exports = router;