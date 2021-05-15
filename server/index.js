const express = require("express");
const config = require('config');
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cities = require("./data/cities.json");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password_here",
  database: "login_system",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    function (err, results) {
      if (!err) {
        console.log(results); // results contains rows returned by server
        res.send({ status: 200, message: "user added successfully" });
      } else {
        res.send({ status: 500, message: "something went wrong" });
        console.log(err);
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * from users WHERE username = ? AND password = ?",
    [username, password],
    function (err, results) {
      if (err) {
        console.log(err);
        res.send({ auth: false, error: err });
      }
      if (results.length > 0) {
        console.log(results);
        const user = results[0].username + results[0].password;
        const token = jwt.sign({ user }, config.get("myprivatekey"), {
          expiresIn: 300,
        });
        console.log(token);
        res.send({ auth: true, token: token, message: "user logged In" });
      } else {
        res.send({ auth: false, message: "Wrong username or password!" });
      }
    }
  );
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("token missing!");
  } else {
    jwt.verify(token, config.get("myprivatekey"), (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "Failed to authenticate" });
      } else {
        req.userId = decoded.user;
        next();
      }
    });
    res.send();
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send({ auth: true, message: "You are authenticated" });
});

app.get("/getCities", verifyJWT, (req, res) => {
  res.send({ status: 200, cities });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
