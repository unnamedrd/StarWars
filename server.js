//console.log("May Node be with you")

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://najwanan:yQ1Mdl9z3Y7Tq1G8@cluster0.ccqge.mongodb.net/?retryWrites=true&w=majority";

/*MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err);
    console.log("connected to database");
    const db = client.db('star-wars-quotes')
});*/

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));

      //res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      quotesCollection.insertOne(req.body).then((result) => {
        res.redirect("/");
        console.log(result);
      });
      console.log(req.body);
    });
    app.put("/quotes", (req, res) => {
      console.log(req.body);
    });
    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch((error) => console.error(error));
