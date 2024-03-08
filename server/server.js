const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const config = require('./config/config.json');
const fs = require('fs')


var currentEvent = config.siteData.currentEvent;

const saltRound = 10;

const auth = require("./auth");

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.options('*', cors())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use (
    session({
        key:"userId",
        secret:"secret",
        resave:'false',
        saveUninitialized:false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
)

app.get("/", (req, res) => {
    res.json({ message: "Strange Scout Test"})
})

app.get('/event', (req,res) => {
    res.json({event:currentEvent})
})

app.post('/setEvent',auth,(req,res) => {
    console.log("set called");
    
    const email = req.user.userEmail;
    const event = req.body.event;
    const admins = config.siteData.admins;
    
    for(var i = 0; i < admins.length; i++)
    {
        if(admins[i] === email)
        {
            console.log("admin true")
            if(event.length === 9)
            {
                console.log("set event")
                config.siteData.currentEvent = event;
                currentEvent = event;
            }
        }
    } 
})

app.post('/register', (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password,saltRound, (err, hash) => {
        if(err) {
            console.log(err);
        }
        if(email && username && name && password) 
        {
            console.log(email + " | " + username + " | " + name + " | " + password);
            connection.query(
                "SELECT * FROM accounts WHERE email = ?",
                email,
                (err, result) => {
                    if(err)
                    {
                        result.send({err:err});
                    }

                    if(result.length <= 0) {
                        console.log("name not in use")
                        connection.query("INSERT INTO accounts (username, password, email, name) VALUES(?, ?, ?, ?)",
                            [username,hash,email,name],
                            (err, result) => {
                                if(err) throw err;
                                res.send({created:true, message:"account created"});
                            }                 
                        );
                    } else {
                        res.send({created:false, message:"email already in use"});
                    }
                }         
            )
        }
    })
})

app.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    
    if(email && password)
    {
        console.log(email + " | " + password);
        connection.query(
            "SELECT * FROM accounts WHERE email = ?",
            [email],
            (err, result)=> {
                if (err) {
                    res.send({err: err});
                }
        
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if(response)
                        {
                            const token = jwt.sign(
                                {
                                    userEmail: result[0].email,
                                    userPswd: result[0].password,
                                },
                                "RANDOM-TOKEN",
                                {expiresIn:"100h"}
                            );
                            req.session.user = result;
                            res.json({auth: true, token: token, result:result});
                        }
                    })
                }else(res.send({message: "Wrong username/password!"}));
            }  
        );
    } 
});

app.get('/isUserAuth', auth,(req,res) => {
    
    console.log(req.user.userEmail + " authed")
    res.json({auth:true, message:"You are authenticated"});
})

app.post('/submit',auth,(req, res) => {
    console.log('hey')
    let email = req.user.userEmail;
    let data = req.body;
    console.log(email)
    connection.query(
        "INSERT INTO matches (eventid, MatchNumber, Matchid, Playoff, TeamNumber, Alliance, Position, Scouter, A_Amp, A_Speaker, A_Moved, A_Pickup, A_Dropped, T_Amp, T_Speaker, T_SpeakerAmp, T_OnStage, T_SpotLight, T_Harmony, T_Trap, T_Parked, T_Pickup, T_Dropped, score, cycleTime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [data.eventCode,data.matchNumber, data.Matchid, data.Playoff, data.teamNumber, data.alliance, data.position, email, data.A_AMP, data.A_Speaker, data.A_Mobility, data.A_Pickup, data.A_Dropped, data.T_AMP, data.T_Speaker, data.T_SpeakerAMP, data.T_Trap, data.T_OnStage, data.T_Spotlight, data.T_Harmony, data.T_Parked, data.T_Pickup, data.T_Dropped, data.score, data.cycleTime],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            } else {
                connection.query(
                    "DELETE FROM matchassign WHERE eventid = ? AND MatchNumber = ? AND TeamNumber = ?",
                    [data.eventCode, data.matchNumber, data.teamNumber],
                    (err,res) => {
                        if(err) {
                            console.log(err);
                        }
                        console.log("deleted");
                    }
                    
                )
            }
        }  
    );
})

app.post('/submitPit',auth,(req, res) => {
    console.log('hey')
    let email = req.user.userEmail;
    let data = req.body;
    connection.query(
        "INSERT INTO pitscout (eventid, TeamNumber, Weight, Perimeter, Amp, Speaker, OnStage, Trap, Note, AutoImage, Scouter) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        [data.eventCode, data.teamNumber, data.weight, data.perimeter, data.amp, data.speaker, data.onStage, data.trap, data.note, data.autoImage ,email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            res.send("submitted");
        }  
    );
})

app.get('/updateData', (req, res) => {
    connection.query(
        "SELECT * FROM matches", (err, results) => {
            if(err) {
                return (err);
            }

            fs.writeFile('data.json',JSON.stringify(results), function(error) {
                if(error) {
                    return console.log(error);
                }
                console.log("JSON db updated");
            })

            console.log(results);
            res.send(results);
        })
})

app.get('/getData',auth, (req,res) => {
    // fs.readFile("data.json", "utf-8", function (err, data) {
    //     if(err)
    //         console.log(err)

    //     const out = JSON.parse(data);
    // });

    const out = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    console.log(req.user.userEmail + ' requested data')
    res.send(out)
    console.log('sent ' + req.user.userEmail + ' data')
})

app.get('/getMatch', auth, (req,res) => {
    connection.query(
        "SELECT * FROM matches WHERE Matchid = ?",
        [req.headers["matchid"]],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.json(result[0]);
            } else(res.send({message: "No data for this match"}));
        }  
    );
})

app.get('/getTeam', auth, (req,res) => {
    console.log(req.headers["team"])
    connection.query(
        "SELECT * FROM matches WHERE TeamNumber = ?",
        [req.headers["team"]],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.json(result);
            } else(res.send({message: "No data for this team"}));
        }  
    );
})

app.get('/getEvent', auth, (req,res) => {
    console.log(req.headers["event"])
    connection.query(
        "SELECT * FROM matches WHERE eventid = ?",
        [req.headers["event"]],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.json(result);
            } else(res.send({message: "No data for this event"}));
        }  
    );
})

app.get('/getUsers', auth, (req,res) => {
    const email = req.user.userEmail;
    const admins = config.siteData.admins;
    
    for(var i = 0; i < admins.length; i++)
    {
        if(admins[i] === email)
        {
            connection.query(
                "SELECT * FROM accounts", (err, result) => {
                    if(err) {
                        res.json({err:err});
                    }
                    if (result.length > 0) {
                        res.json(result);
                    } else(res.send({message: "No data"}));
                    
                }
            )
        }
    } 
})

app.post('/assignMatch', auth, (req,res) => {
    const email = req.user.userEmail;
    const admins = config.siteData.admins;
    const data = req.body;
    
    for(var i = 0; i < admins.length; i++)
    {
        if(admins[i] === email)
        {
            connection.query(
                "INSERT INTO matchassign(email,eventid,MatchNumber,TeamNumber) VALUES(?,?,?,?)",
                [data.email, data.eventCode, data.matchNumber, data.teamNumber], 
                (err, result) => {
                    if(err) {
                        res.json({err:err});
                    } else {
                        res.json({message:"Match Assigned"})
                    }
                    
                    
                }
            )
        }
    } 
})

app.get('/getAssignedMatches', auth, (req,res) => {
    const email = req.user.userEmail;
    connection.query(
        "SELECT * FROM matchassign WHERE email = ?",
        [email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.json(result);
            } else(res.send({message: "No matches"}));
        }  
    );
})

// app.get('/clearMatches', (req,res) => {
//     var matchdata;
//     connection.query(
//         "SELECT * FROM matches",
//         (err,result) => {
//             if(err) {
//                 console.log(err);
//             }

//             if(result.length > 0) {
//                 matchdata=result.data;
//                 console.log(matchdata)
//                 console.log('loop')
//                 for(let i = 0; i < JSON.parse(JSON.stringify(matchdata)).length; i++)
//                 {
//                     connection.query(
//                         "SELECT * FROM matchassign WHERE eventid = ? AND MatchNumber = ? AND TeamNumber = ?",
//                         [matchdata[i].eventid, matchdata[i].MatchNumber, matchdata[i].TeamNumber],
//                         (err,result) => {
//                             if(err) {
//                                 console.log(err)
//                             }

//                             if(result > 0)
//                             {
//                                 console.log('delete')
//                                 connection.query(
//                                     "DELETE FROM matchassign WHERE matchAssignId = ?"
//                                     [res[0].matchAssignId],
//                                     (err,res) => {
//                                         if(err) {
//                                             console.log(err);
//                                         }
//                                         console.log("deleted");
//                                     }
                                    
//                                 )
//                             }
//                         }
//                     )
//                 }
//             }
//         }
//     )
// }) 

app.get('/getAdmin',auth, (req,res) => {
    const email = req.user.userEmail;
    const admins = config.siteData.admins;
    
    for(var i = 0; i < admins.length; i++)
    {
        if(admins[i] === email)
        {
            res.json({admin:true})
        } else {res.JSON({admin:false})}
    } 
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`);
});
