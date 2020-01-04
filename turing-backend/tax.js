var express = require("express");
var app = express();

const options = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "navgurukul",
        database: "turing"
    }
};
let knex = require("knex")(options)

// 1
app.get("/get_tax", (req,res,) => {
    knex.select("*").from("tax").then((data)=>{
        res.send(data)
    })
})

// 2
app.get("/get_tax/:tax_id", (req,res,) => {
    let tax_id = req.params.tax_id
    knex("tax").where("tax_id",tax_id).then((data)=>{
        res.send(data)
    })
})

app.listen(5000, () => {
    console.log("5000 port pr shunta hai")
});