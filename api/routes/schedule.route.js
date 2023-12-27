const express = require("express");
const OpenAI = require("openai");
const Team = require("../models/team.model.js");
const Task = require("../models/task.model.js");
const User = require("../models/user.model.js");


const OPENAI_API_KEY='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'

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

const router = express.Router();

router.post("/user/:userid", async(req,res) => {

  try {
    const user = await User.findById(req.params.userid);
    console.log("User at schedule backend",user);
    const tasks = await Task.find({assignedTo: user.name});
    console.log("Tasks at schedule backend",tasks)

    const requestByUser = req.body.requestByUser;
  
    const data = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        {
          role: "user",
          content:
            `Design a timetable for whole week in 24hr format Eg( "Monday": {"9:00 - 10:00": "task 1", ...so on}, "Tuesday":{...}, ..).
              For Complete Week Sunday to Saturday
              Important : Mention every time interval only from 9am to 6pm
              Minimum time spend on any activity is 30 mins
              timtable should only contain tasks that a Employee has in his office ${tasks}
              Use task name only -> free,meeting,break,lunch,learn,for any task use exact task.title.
              you need to use task title from ${tasks} and write same title in schedule Eg Task 1, Task 2
              prepare timetable only for office time that is 9am to 6pm and include only the above activities in it.
              you can do a task on many days also. For eg task 1 can be done on monday and tuesday etc
              breaks are needed while working continuously
              office Hours->9am to 6pm
              this is the userdata: ${user}.
              This request raised by user sometimes consider this while making timetable if present, request: ${requestByUser}
              `,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      temperature: 0.8
    });

    if (data) {
      //   if (data.choices[0].text) {
      //     res.status(200).json(data.choices[0].text);
      //   }
      const timeTableText = data.choices[0].message.content;
      const timeTableJson = JSON.parse(timeTableText);
      res.status(200).send(timeTableJson);
      console.log("Timetable at backend:",timeTableJson);
    }
  } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  }
)

router.get("/team/:teamid", async (req, res)=> {

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
                      Minimum time spend on any activity is 30 mins. You can make longer activities from that
                      Use task name only -> free,meeting,break,lunch,tak( for any task like task1, task 2, ..).
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



module.exports = router;











