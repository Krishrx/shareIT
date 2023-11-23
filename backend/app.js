require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ThoughtsModel = require("./models/thoughtsModel");
const port = 8000;
const dbURI = process.env.MONGO_DB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => {
        console.log(`app listening on ${port}`);
    })
}).catch((err) => {
    console.log(err);
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send("got the data")
})



app.get("/", (req, res) => {
    const content = new ThoughtsModel({
        "title": "food",
        "content": "i like dosa",
        "isPublic": false
    });
    content.save().then(result => {
        console.log('Data saved:', result);
        res.send("data saved");
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
})

app.get('/thoughts', (req, res) => {
    ThoughtsModel.find()
        .then((result) => {
            res.send(result);
        })
        .catch(error => {
            console.error('Error while retrieving data:', error);
            res.status(500).send('Internal Server Error');
        });
});