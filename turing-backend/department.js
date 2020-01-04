var express = require("express");
var app = express();

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
// 1
app.get("/get", (req,res,) => {
    knex.select("*").from("department").then((data)=>{
        res.send(data)
    })
})

// 2
app.get("/get/:department_id", (req,res,) => {
    let department_Id = req.params.department_id
    knex("department").where("department_Id",department_Id).then((data)=>{
        res.send(data)
    })
})

app.listen(7000, () => {
    console.log("7000 port pr shunta hai")
});