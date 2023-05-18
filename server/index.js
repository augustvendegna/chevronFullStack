const keys = require("./keys");

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
  host: 'dockerdietpi',
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

// now the post -> insert value
app.post("/addUser", async (req, res) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query("INSERT INTO users(first_name, last_name) VALUES($1, $2)", [req.body.first, req.body.first]);

  //res.send({ working: true });
});

app.listen(5000, err => {
  console.log("Listening on port 5000");
});
