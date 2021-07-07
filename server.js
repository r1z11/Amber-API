const express = require('express');
const { MongoClient } = require('mongodb');
const db = require('./config/db');

const app = express();

const port = 8000;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const client = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const db = client.db("amber");
    const collection = db.collection("amber_collection");
    // perform actions on the collection object

    if (err)
        return console.log(err);

    require('./routes')(app, client);

    app.listen(port, () => {
        console.log('API live on ' + port);
    });
});
