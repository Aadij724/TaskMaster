const express = require("express")
const User = require("../models/user.model.js")
const mongoose = require('mongoose')

const router = express.Router();

router.get("/availableEmps", async (req,res) => {
    try {
        const availableEmps = await User.find({available:true});
        res.status(200).json(availableEmps);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.put(`/:userid/setAvailableEmpAsFalse`, async (req,res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.userid) },
            {
                $set: {
                    available: false,
                },
            },
            { new:true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log("Some err in put setAvailableEmpAsFalse :",err);
        res.status(500).send(err);
    }
})

router.put("/:userid", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.userid) },
            {
                $set: {
                    teamId: req.body.teamId,
                }
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log("Error at backend update teamid :",err);
    }
})

router.get("/:userid", async (req,res) => {
    try {
        const user = await User.findById(req.params.userid);
        res.status(200).json(user);

    } catch (err) {
        console.log("some err at backend getusername: ",err);
        res.status(500).send(err);
    }
})

module.exports = router;