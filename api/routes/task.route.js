const express = require("express");
const Task = require("../models/task.model.js");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/", async (req,res) => {

    console.log(req.body)

    const newTask = new Task({
        title: req.body.title,
        details: req.body.details,
        estTimeReq: req.body.estTimeReq,
        status: "tobedone",
        skillsReq: req.body.skillsReq,
        teamId: req.body.teamId,
        assignedTo: req.body.assignedTo,
    })

    try {
        const savedTask = await newTask.save();
        console.log("Saved Task: ",savedTask);
        res.status(200).json(savedTask);
    } catch(err) {
        console.log("Some error at backend in saving task ",err);
        res.status(500).send(err);
    }
})

router.put("/:taskid/markCompleted", async (req,res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.taskid) },
            {
                $set: {
                    actualTimeTaken: req.body.timeTaken,
                    status: "completed",
                }
            },
            { new: true }
        );
        res.status(200).json(updatedTask);
        console.log("At  backend task completed",updatedTask);
    } catch (err) {
        res.status(500).send(err);
        console.log("At backend err in completed task",err);
    }
})

router.put("/:taskid/setAssign", async (req,res) => {
    try {
        console.log("At backend assginTo : ",req.body.assignTo)
        const updatedTask = await Task.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.taskid) },
            {
                $set: {
                    assignedTo: req.body.assignTo,
                }
            },
            { new: true }
        );
        res.status(200).json(updatedTask);
        console.log("At  backend task assign set",updatedTask);
    } catch (err) {
        res.status(500).send(err);
        console.log("At backend err in assign task",err);
    }
})



module.exports = router;