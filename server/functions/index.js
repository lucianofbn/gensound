const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");
var serviceAccount = require("./config.json");
const rateLimit = require("express-rate-limit");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gensound-webapp-default-rtdb.firebaseio.com"
});

var db = admin.database();
const app = express();
app.use(cors());
app.use(
    rateLimit({
        windowMs: 1 * 60 * 60 * 1000, // 12 hour duration in milliseconds
        max: 100,
        message: "You exceeded requests hour limit!",
        headers: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post("/endpoint", (req, res) => {
    var _variable = req.body.variable;
});

app.post("/generatemusic", (req, res) => {
    var musics = [];
    var _genre = req.body.genre;
    var ref = db.ref("/music/genres/" + _genre);
    ref.once("value", function (snapshot) {
        var data = snapshot.val();
        for (const [key, value] of Object.entries(data)) {
            musics.push(data[key])
        }
        var music = musics[Math.floor(Math.random() * musics.length)];
        res.send(music)
    });
});

exports.app = functions.https.onRequest(app);