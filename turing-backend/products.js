var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var knex = require("./conncet_pro.js") 

app.use(bodyParser.json())

var mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "navgurukul",
    database: "turing"
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log("db connected");
    else
        console.log("not connected");
});

// 1
app.get("/get_product", (req,res,) => {
    knex.select("*").from("product").then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

//  2
app.get('/products/:search_value',(req,res) => {
    var search_value  = req.params.search_value;
    knex.select('*').from('product').where('name','like',  '%' +search_value+ '%').then((data)=>{
        res.send(data)
    })
})

//  3
app.get("/get_products/:product_id", (req,res,) => {
    let product_id = req.params.product_id
    knex("product").where("product_id",product_id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

//  4
app.get('/products/inCategory/:category_id',(req,res) => {
    var category_id = req.params.category_id;
    knex.select('*')
    .from('product')
    .join('category','category.category_id','product.product_id')
    .where("category_id",category_id).then((data) => {
        res.send(data)
    })
})

//  5
app.get('/products/inDepartmet/:department_id',(req,res) => {
    var department_id = req.params.department_id;
    knex.select('*')
    .from('product')
    .join('department','department.department_id','product.product_id')
    .where("department_id",department_id).then((data) => {
        res.send(data)
    })
})

//  6
app.get("/products_details/:product_id",(req,res) => {
    var product_id = req.params.product_id;
    knex("product").where("product_id",product_id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

//  7
app.get('/products_locations/:product_id',(req,res) => {
    var product_id = req.params.product_id
    knex("product_category")
    .join("category","product_category.category_id",'=',"category.category_id")
    .join("department","category.department_id",'=', "department.department_id")
    .select("category.category_id","department.name as department_name ","product_id","category.name as category_name")
    .where("product_id",product_id).then((attb) => {
        res.send(attb)
    }).catch((err)=>{
        res.send(err)
    })
});

// 8
app.get('/products_reviews/:product_id',(req,res) => {
    var product_id = req.params.product_id
    knex("product")
    .join('product_review','product.product_id','=','product_review.product_id')
    .select('product_review.name','review','rating', 'product.product_id as product_id')
    .where('product_review.product_id',product_id)
    .then((data)=>{
       res.send(data)
    }).catch((err)=>{
       res.send(err)
    })
})

//  9
app.post('/products_reviews', (req, res) => {
    var review_data = {
        product_id: req.body.product_id,
        review: req.body.review,
        rating: req.body.rating,
        name: req.body.name
    }
    knex("product_review").insert(review_data).then((data)=> {
        console.log("post done!");
        res.send(data);
    })
});

app.listen(5001, () => {
    console.log("5001 port pr shunta hai")
});