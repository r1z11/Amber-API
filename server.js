const express = require('express');
const { MongoClient } = require('mongodb');
const db = require('./config/db');

const app = express();

const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Origin,Accept,Authorization');
    next();
});

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
