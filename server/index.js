const keys = require("./keys");
const alg = require("./algorithms");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: '5432'
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS users (first_name TEXT, last_name TEXT)")
    .catch(err => console.log("PG ERROR. CONNECT :(", err));
});

//Express route definitions
app.get("/", (req, res) => {
  res.send("Hello there. This is your back end. Please go to /users to view the users table.");
});

// get the values
app.get("/users", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM users");
  //const result = [values.rows.map(row => (row.first_name + " " + row.last_name))];
  res.send(values.rows);
});

//query for login checking
app.get("/getUser", async (req, res) => {
  console.log(req.query);
  const values = await pgClient.query("SELECT * FROM users WHERE email = $1 AND password = $2", [req.query.email, req.query.password]);
  res.send(values.rows);
  //console.log(values);
});

// now the post -> insert value
app.post("/addUser", async (req, res) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query("INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)", [req.body.first, req.body.last, req.body.email, req.body.password, req.body.now, req.body.is_enabled, req.body.now, req.body.is_admin, req.body.username]);

  //res.send({ working: true });
});

app.get("/submissions", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM submissions");
  //const result = [values.rows.map(row => (row.first_name + " " + row.last_name))];
  res.send(values.rows);
});

const multer = require('multer');
const logger = require('morgan');
const serveIndex = require('serve-index');
const path = require('path');
const debug = require('debug')('myapp:server');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });



app.post('/addSubmission', upload.single('file'), function(req,res) {
  debug(req.file);
  console.log('storage location is', req.hostname +'/' + req.file.path);
  return res.send(req.file);
});


var challengeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './challenges')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const challengeUpload = multer({ storage :challengeStorage});

app.post('/addChallengeKey', challengeUpload.single('file'), async function(req,res) {
  //console.log("what");
  debug(req.file);
  await pgClient.query("INSERT INTO challenges VALUES(DEFAULT, 'c minus one', DEFAULT, DEFAULT, DEFAULT, DEFAULT, 'rmse_c')");
  const values = await pgClient.query("SELECT challenge_id FROM challenges ORDER BY challenge_id DESC LIMIT 1");
  //const result = [values.rows.map(row => (row.first_name + " " + row.last_name))];
  console.log(values.rows);
  console.log('storage location is', req.hostname +'/' + req.file.path);
  
  return res.send(req.file);
});


app.post("/addSubmissionInfo", async (req, res) => {
  if (!req.body.value) res.send({ working: false });
  pgClient.query("INSERT INTO submissions VALUES($1, DEFAULT, $2, $3, $4, $5, $6)", [req.body.fileName, req.body.now, req.body.challenge_id, req.body.is_public, req.body.user_id, req.body.score]);

  //res.send({ working: true });
});

app.get("/getTargetUserInfo", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM users WHERE email = $1", [req.query.email]);
  res.send(values.rows);
  console.log(values.rows);
});

app.post("/updateTargetUser", async (req, res) => {
  if (!req.body.value) res.send({ working: false });
  console.log("UPDATE users SET is_enabled = $1, is_admin = $2, status_date = $4 WHERE email = $3", [req.body.is_enabled, req.body.is_admin, req.body.email, req.body.now]);
  pgClient.query("UPDATE users SET is_enabled = $1, is_admin = $2, status_date = $4 WHERE email = $3", [req.body.is_enabled, req.body.is_admin, req.body.email, req.body.now]);
});

app.post("/changePassword", async (req, res) => {
  if (!req.body.value) res.send({ working: false });
  console.log("UPDATE users SET password = $2, password_date = $3 WHERE email = $1", [req.body.email, req.body.password, req.body.now]);
  pgClient.query("UPDATE users SET password = $2, password_date = $3 WHERE email = $1", [req.body.email, req.body.password, req.body.now]);
});

app.get("/getLeaderboardInfo", async (req, res) => {
  const values = await pgClient.query("SELECT u.username, MAX(s.score) FROM users u, submissions s WHERE u.user_id = s.user_id GROUP BY u.username ORDER BY MAX(s.score) ASC")
  res.send(values.rows);
  console.log(values.rows);
});

app.get("/getSubmissionID", async (req, res) => {
  const values = await pgClient.query("SELECT submission_id FROM submissions WHERE user_id = $1 ORDER BY submission_time DESC LIMIT 1", [req.query.UID])
  res.send(values.rows);
  console.log(values.rows);
});

app.get("/getTestFlag", async (req, res) => {
  const values = await pgClient.query("SELECT testFlag FROM challenges WHERE challenge_id = $1", [req.query.CID]);
  res.send(values.rows);
  console.log(values.rows);
});


//getting files and reading

app.post("/computeScore", (req, res) => {
  var testFlag = req.body.testFlag;
  var submission_id = req.body.submission_id;
  

  const csv = require('csv-parser')
  const fs = require('fs');
  var pResults = [];
  var aResults = [];
  var predicted = [];
  var actual = [];

  //will most likely put into funciton and pass in a file name parameter to change temp.csv out with
  //instal: npm install csv-parser
  fs.createReadStream('./uploads/user_submission_1.csv').pipe(csv())
    .on('data', (data) => {
      pResults.push(data);
    }) 
    .on('end', () =>{
      for(let i = 0; i < pResults.length; i++){
        var curString = JSON.stringify(pResults[i]);
        curString = curString.replaceAll("}", "");
        curString = curString.replaceAll("\"", "");
        var curRow = curString.split(/,|:/);

        predicted.push(parseInt(curRow[3]));
      }

  });

  setTimeout(() =>
  fs.createReadStream('./challenges/key_1.csv').pipe(csv())
  .on('data', (data) => {
    aResults.push(data);
  }) 
  .on('end', () =>{

    for(let i = 0; i < aResults.length; i++){
      var curString = JSON.stringify(aResults[i]);
      curString = curString.replaceAll("}", "");
      curString = curString.replaceAll("\"", "");
      var curRow = curString.split(/,|:/);

      actual.push(parseInt(curRow[3]));
    }

    //check for flags on what tests to run
    switch(testFlag){
      case "rmse_c":{
        var score = alg.rmse_c(actual, predicted)
      }
      case "MAE":{
        var score = alg.calculateMeanAbsoluteError(actual, predicted)
      }
      case "mse_c":{
        var score = alg.mse_c(actual, predicted)
      }
      case "rsq":{
        var score = alg.rsq(actual, predicted);
      }
      case "fscore":{
        var score = alg.fscore(actual, predicted);
      }
      pgClient.query("UPDATE submissions SET score = $1 WHERE submission_id = $2", [score, submission_id]);
    }

  }), 10000);
});


//running tests on files
//write switch or if statements to check for testing flags
//OR write a function that takes in the results 



app.listen(5000, err => {
  console.log("Listening on port 5000");
});
