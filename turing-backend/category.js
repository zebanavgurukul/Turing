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
app.get("/get_category", (req,res,) => {
    knex.select("*").from("category").then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

// 2
app.get("/get_category/:category_id", (req,res,) => {
    let category_id = req.params.category_id
    knex("category").where("category_id",category_id).then((data) => {
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})
//  3
// app.get("/get_inproduct/:product_id",(req,res) => {
//     var product_id = req.params.product_id
//     knex('category')
//     .select('*')
//     .join('product_category','category.category_id','=','product_category.category_id')
//     .where('product_category.product_id',product_id)
//     .then((data)=>{
//        res.send(data)
//     }).catch((err)=>{
//        res.send(err)
//     })
// });

// 3
app.get("/get_inproduct/:product_id",(req,res) => {
    var product_id = req.params.product_id
    knex('category')
    .select('product_category.category_id','category.department_id','name')
    .join('product_category','category.category_id','=','product_category.category_id')
    .where('product_category.product_id',product_id)
    .then((data)=>{
       res.send(data)
    }).catch((err)=>{
       res.send(err)
    })
});
// 4
app.get("/get_inDepartment/:department_id",(req,res) => {
    var department_id = req.params.department_id
    knex("category").where("department_id",department_id).then((data) => {
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
});

app.listen(5000, () => {
    console.log("5000 port pr shunta hai")
});

