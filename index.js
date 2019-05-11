const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const userRoute = require('./apis/user.js');
const productRoute = require('./apis/products.js');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'hello-server';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    app.use((req, res, next) => {  //global middlewares
        req.db = db;
        next();
    });
    //load route
    userRoute.load(app);
    productRoute.load(app);
    app.use(function (err, req, res, next) {
        console.log(err);
        if (Array.isArray(err.errors)) {
            const messagese = err.errors.map(function(item) {
                return item.message;
            });
            return res.status(400).json({
                error : messagese
            });
        }
        return res.json({
            message: err.message || 'have error'
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});