const express = require("express");
const OpenAI = require("openai");
const Team = require("../models/team.model.js");
const Task = require("../models/task.model.js");


const OPENAI_API_KEY=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

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

const router = express.Router();

router.get("/team/:teamid", isAuth, async (req, res)=> {

    try {    

        const team = await Team.findById(req.params.teamid);
        const team_members = team.teamMem;

        const schedules = [];

        team_members.forEach( async(mem) => {
            const tasks = await Task.find({userId: mem});

            const data = await openai.chat.completions.create({
                messages: [
                  {
                    role: "system",
                    content: "You are a helpful assistant designed to output JSON.",
                  },
                  {
                    role: "user",
                    content:`
                    I am providing you with the tasks of a team member; 
                    ${tasks}
                    you need to make a time table for the team member
                    Design a timetable for whole week in 24hr format Eg( {"09:00 - 10:00": "meeting", "10:00 - 11:00": "task 1", ... , "17:00 - 18:00": "task 10"} ).
                      only for today
                      Mention every time interval from 9am to next 6pm not any other
                      Minimum time spend on any activity is 30 mins
                      Use task name only -> free,meeting,break,lunch,project( for any task like task1, task 2, ..).
                      preffered work in office hours-> meeting,break,project,lunch,free
                      breaks are needed while working continuously
                      lunch time:1pm
      
                    `,
                  },
                ],
                model: "gpt-3.5-turbo-1106",
                response_format: { type: "json_object" },
                temperature: 0.8
            });
          
            if (data) {
                const timeTableText = data.choices[0].message.content;
                const timeTableJson = JSON.parse(timeTableText);
                res.status(200).json(timeTableJson);
            }
            
            schedules.push({ mem: data })
            res.status(200).json(schedules);
        });
    }

    catch (err) {
        console.log("err in scheduing", err);
        res.status(500).send(err);
    }

})

router.get("/user/:userid", isAuth, async (req, res)=> {

})

module.exports = router;











