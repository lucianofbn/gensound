const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");
var serviceAccount = require("./config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gensound-webapp-default-rtdb.firebaseio.com"
});

var db = admin.database();
const app = express();
app.use(cors());

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