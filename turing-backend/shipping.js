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
app.get("/get_shipping_region",(req,res) => {
    knex('shipping_region').then((data)=>{
        return res.send(data)
    })
})

// 2
app.get("/get_shipping/:shipping_region_id", (req,res,) => {
    let shipping_region_id = req.params.shipping_region_id
    knex("shipping").where("shipping_region_id",shipping_region_id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

app.listen(5000, () => {
    console.log("5000 port pr shunta hai")
});