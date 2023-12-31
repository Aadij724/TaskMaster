require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./models/user.model.js");
const TeamRoute = require("./routes/team.route.js");
const UserRoute = require("./routes/user.route.js");
const TaskRoute = require("./routes/task.route.js");
const ScheduleRoute = require("./routes/schedule.route.js");


const clientid = "1050381780885-2eo1cjr3uvtmlkggskhcbodqn4c4vlqg.apps.googleusercontent.com"
const clientsecret = "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"


app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"YOUR SECRET KEY",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email",
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value,
                    accessToken:accessToken,
                    refreshToken:refreshToken,
                    available:true,
                    teamId: 'none',
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// Routes
app.use( "/teams", TeamRoute);
app.use("/users", UserRoute);
app.use("/tasks", TaskRoute);
app.use("/schedule", ScheduleRoute);

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email",
'https://www.googleapis.com/auth/calendar',
'https://www.googleapis.com/auth/calendar.events']}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/",
    failureRedirect:"http://localhost:5173/login"
}))

app.get("/login/success",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:5173/login");
    })
})

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})