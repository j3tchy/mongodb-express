const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");

const MongoClient = require("mongodb").MongoClient;

var db;
var url = "mongodb://mongo:27017/";

/**
 * Connect to the MongoDB
 */
MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
        if (err) return console.log(err);

        db = client.db("star-wars-quotes");

        app.listen(3000, () => {
            console.log("Listening to 3000");
        });
    }
);

/**
 * Puts form content into the body
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Set template engine
 */
app.set("view engine", "ejs");

/**
 * API CREATION
 * GET request on '/' returns an data from the quotes 'collection' within
 * MONGODB. The response is turned into an array. An ejs file is used to display
 * the information. The data is passed onto a 'quotes' variable
 * which is looped though within the ejs index file
 */
app.get("/", (req, res) => {
    db.collection("quotes")
        .find()
        .toArray((err, results) => {
            if (err) return console.error(err);
            res.render("index.ejs", { quotes: results });
        });
});

/**
 * POST request is used to save data to the quotes collection. A collection
 * is made up of documents.
 */
app.post("/quotes", (req, res) => {
    db.collection("quotes").save(req.body, (err, res) => {
        if (err) return console.error(err);
    });
    res.redirect("/");
});
