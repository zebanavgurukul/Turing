var bodyParser = require("body-parser");
var express = require("express");
var app = express();
app.use(bodyParser.json())

const options = {
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "navgurukul",
        database: "turing"
    }
};
let knex = require("knex")(options)


