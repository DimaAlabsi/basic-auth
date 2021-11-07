"use strict";

const express = require("express");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const Router=require('./auth/route');
const handle404Error = require('./error-handlers/404');
const handle500Error = require("./error-handlers/500");




app.get('/', (req, res) => {
    res.status(200).send("All is going to work here  🤩 ");
})
app.get('/status', (req, res) => {

    res.status(200).send({
        "status": "running",
        "port": 8080

    });
});
app.get('/bad', (req, res, err) => {
    throw new Error('Something wrong happen here 😶')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.use('*', handle404Error);
app.use(handle500Error);


function start() {
    app.listen(PORT, () => {
        console.log(`Listening to the post ${PORT}`);
    })
}

module.exports = {
    server: app,
    start: start
}