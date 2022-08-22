const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { reset } = require('nodemon');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    secret: "undefined",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

const saltRounds = 10

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'authentication',
});

app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        
        if(err) {
            console.log(err)
        }

        db.query("INSERT INTO user (username, password) VALUES (?,?);", [username, hash], (err, result) => {
            console.log(err);
        });

    });
});


app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    }
    else {
        res.send({ loggedIn: false });
    }
});


app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE username = ?;", username, (err, result) => {
        if (err) {
            res.send({ err: err })
        }
    
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    res.send(result)
                } else {
                    res.send({ message: "Wrong username or password!" })
                }
            })
        }
        else {
            res.send({ message: "User doesn't exist!" })
        }
    });
});

app.get("/logout", (req, res) => {
    res.cookie('userId', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
});

app.listen(3001, () => {
    console.log('Running on port 3001');
});