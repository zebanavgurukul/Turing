const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var app = express();
var knex = require("./conncet_shop.js") 

app.use(bodyParser.json())
const randomString = require('random-string');
let generateUniqueId = randomString();

var knex = require("knex")({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "navgurukul",
        database: "turing"
    },
    useNullAsDefault: true
});
module.exports = knex;

knex.schema.hasTable("save_item").then((exists) => {
    if (!exists) {
        knex.schema.createTable("save_item", (table) => {
            table.integer("item_id")
            table.integer("cart_id")
            table.integer("product_id")
            table.integer("buy_now")
            table.integer("added_on")
            table.string("attributes")
            table.integer("quantity")
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});


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
app.get('/shoppingcart/generateUniqueId', (req,res) => {
    let total_data = {
        cart_id : generateUniqueId
    }
    res.send(total_data) 
});

// 2
app.post('/shoppingcart', (req,res) => {
    let shoppingcart_data = {
        item_id: req.body.item_id,
        cart_id: req.body.cart_id,
        quantity: req.body.quantity,
        product_id: req.body.product_id,
        attributes: req.body.attributes,
        added_on: new Date()
    }
    knex("shopping_cart").insert(shoppingcart_data).then((shopping_data)=> {
        console.log("post done!");
        res.send(shopping_data);
    })
});

// 3
app.get("/shopping_cart/:cart_id", (req,res,) => {
    let cart_id = req.params.cart_id
    knex("shopping_cart").where("cart_id",cart_id).then((cart_data)=>{
        res.send(cart_data)
    })
});

// 4
app.put('/shoppingcart_update/:item_id', (req,res) => {
    var item_id = req.params.item_id
    knex("shopping_cart")
    .join("product","shopping_cart.product_id",'=',"product.product_id")
    .select("shopping_cart.item_id","attributes","quantity","product.product_id","price","name")
    .where("item_id",item_id)
    .then((update) => {
        // console.log(update)
        let date = {
            item_id : update[0]['item_id'],
            attributes : update[0]['attributes'],
            quantity : update[0]['quantity'],
            product_id : update[0]['product_id'],
            price : update[0]['price'],
            name : update[0]['name'],
            subtotal : update[0]['price']*update[0]['quantity']
        }
        res.send(date)
    }).catch((err)=>{
        res.send(err)
    })
})

// 5
app.delete('/shoppingcart/empty/:cart_id',(req,res,) => {
    let cart_id =  req.params.cart_id
    knex('shopping_cart').where('cart_id',cart_id).del().then(()=>{
        res.send("deleted the cart !!!")
    })
})

// 6
app.delete('/shoppingcart/moveToCart/:item_id', (req,res) => {
    let item_id = req.params.item_id
    knex('saveForLater').where('item_id',item_id)
    .del().then(() => {
        res.send('deleted the item_id !!!')
    })
});

// 7
app.get('/totalAmount/:cart_id',(req,res)=>{
    let cart_id = req.params.cart_id
    knex("shopping_cart")
    .join("product","shopping_cart.product_id", "=", "product.product_id")
    .select("shopping_cart.quantity","product.price")
    .where("cart_id",cart_id).then((data)=>{
        var total_data = {
            totalAmount : data[0]["quantity"]*data[0]["price"]
        }
        res.send(total_data)
    })      
});

// 8
app.get('/saveForLater/:item_id',(req,res) => {
    let item_ID = req.params.item_id
    knex('shopping_cart').where("item_id",item_ID).then((data1) => {
        // res.send(data1[0])
        // console.log(data1[0]['item_id'])
        knex('saveForLater')
        .insert({
            "item_id" : data1[0]['item_id'],
            "cart_id" : data1[0]['cart_id'],
            "product_id" : data1[0]['product_id'],
            "attributes" : data1[0]['attributes'],
            "quantity" : data1[0]['quantity']
        })
        .then((data1)=>{
            res.send(data1)
            console.log("data inserted ")
            knex('shopping_cart')
            .where('shopping_cart.item_id',req.params.item_id)
            .del().then((data1)=>{
                console.log("data deleted")
            })
        })
    })
});

// 9 post kiya tha
app.post('/save_item_data', (req,res) => {
    let save_data = {
        item_id: req.body.item_id,
        cart_id: req.body.cart_id,
        quantity: req.body.quantity,
        product_id: req.body.product_id,
        buy_now : req.body.buy_now,
        attributes: req.body.attributes
    }
    knex("save_item").insert(save_data).then((save_item_data)=> {
        console.log("post done!");
        res.send(save_item_data);
    })
});

// 9
app.get('/shoppingcart_getSaved/:cart_id', (req,res) => {
    let cart_id = req.params.cart_id
    knex('save_item')
    .join('product','save_item.cart_id','=', 'product.product_id')
    .select('product.name','save_item.item_id','attributes','price')
    .where('cart_id',cart_id).then((data) => {
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
});

// 10
app.delete('/shoppingcart/removeProduct/:item_id',(req,res) => {
    let item_id =  req.params.item_id
    knex('shopping_cart')
    .where('item_id',item_id).del().then(() => {
        res.send("Item is removed from the cart !!!")
    })
});

app.listen(5001, () => {
    console.log("5001 port pr shunta hai")
});