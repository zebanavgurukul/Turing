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
app.get("/get_attribute", (req,res,) => {
    knex.select("*").from("attribute").then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// 2
app.get("/get_attribute/:attribute_id", (req,res,) => {
    let attribute_Id = req.params.attribute_id
    knex("attribute").where("attribute_id",attribute_Id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// app.get("/get_attribute_value/:attribute_value_id",(req,res) => {
//     var attribute_value_id = req.params.attribute_value_id
//     knex('attribute')
//     .select('*')
//     .join('attribute_value','attribute.attribute_id','=','attribute_value.attribute_id')
//     .where('attribute_value.attribute_value_id',attribute_value_id)
//     .then((data)=>{
//        res.send(data)
//     }).catch((err)=>{
//        res.send(err)
//     })
// });

// 3 and 4
app.get("/value_inproduct/:product_id",(req,res) => {
    var product_id = req.params.product_id
    knex("attribute")
    .join("attribute_value","attribute.attribute_id",'=',"attribute_value.attribute_id")
    .join("product_attribute","attribute_value.attribute_value_id",'=', "product_attribute.attribute_value_id")
    .select("attribute_value.attribute_value_id","name","value").where("product_id",product_id).then((attb) => {
        res.send(attb)
    }).catch((err)=>{
        res.send(err)
    })
});

app.listen(5000, () => {
    console.log("5000 port pr shunta hai")
});