const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const saltRound = 10;

const auth = require("./auth");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'nodelogin'
});

const app = express();
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
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
                                {expiresIn:"24h"}
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
    console.log('sent')
    res.json({auth:true, message:"You are authenticated"});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`);
});

