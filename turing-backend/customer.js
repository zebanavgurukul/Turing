var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
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

// 1
app.put('/customers_address', (req, res) => {
    var alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,300)
    // console.log(token)
    jwt.verify(token, 'zeba', (err,data) => {
        console.log(data)
        if (!err){
            knex('customer')
            .where("customer_id",data.customer_id)
            .update ({
                customer_id: req.body.customer_id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                city: req.body.city,
                country:req.body.country,
                mob_phone:req.body.mob_phone,
                address_1:req.body.address_1
            })
            .then(()=>{
                res.send('updata')
            }).catch((err)=>{
                res.send(err)
            })
        }else{
            res.send(err)
        }
    })
});

// 2
app.get('/customer',(req,res)=>{
    var alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,300)
    jwt.verify(token , 'zeba', (err,data)=>{
        if(!err){
        knex('customer')
        .select('*')
        .where('customer.customer_id',data.customer_id)
        .then((data)=>{
                    delete data[0].password
            res.send(data)
        }).catch((err)=>{
            res.send(err)
        })
        }else{
            res.send(err)
        }
    })
})

// 3
app.post("/customers", (req, res) => {
    var customers_data = {
        customer_id: req.body.customer_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        country:req.body.country,
        shipping_region_id:req.body.shipping_region_id,
        mob_phone:req.body.mob_phone,
        address_1:req.body.address_1
    }
    knex("customer").insert(customers_data).then((data)=> {
        console.log("post done!");
        res.send(data);
    })
});

// 4
app.post('/loing',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    knex.select('email').from('customer').havingIn('customer.email',email).then((logindata)=>{
        if(logindata.length==0){
            res.send('worng email')
        }else{
            knex.select('password').from('customer').havingIn('customer.password',password).then((logindata)=>{
                if(logindata.length==0){
                    res.send('wrong password ')
                }else{
                    let token = jwt.sign({"costomer":logindata},"zeba")
                    console.log(token);
                        res.cookie(token)
                        res.send('loing successful')
                    }
                })
            }
        }).catch((err)=>{
            res.send(err)
    })
});

// 6
app.put('/customers_address', (req, res) => {
    var alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,300)
    // console.log(token)
    jwt.verify(token, 'zeba', (err,data) => {
        console.log(data)
        if (!err){
            knex('customer')
            .where("customer_id",data.customer_id)
            .update({
                address_1 : req.body.address_1,
                address_2 : req.body.address_2
            })
            .then(()=>{
                res.send('updata')
            }).catch((err)=>{
                res.send(err)
            })
        }else{
            res.send(err)
        }
    })
})

//  7
app.put('/customers/creditCard', (req,res) => {
    var alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(0,-10)
    console.log(token)
    var customers_data = {
        credit_card: req.body.credit_card,
        name : req.body.name
    }
    knex("customer")
    .where({ customer_id: req.body.customer_id })
    .update( customers_data).then((data) => {
        console.log("updata done");
        res.send(data)
    })
});

app.listen(5007, () => {
    console.log("5007 port pr shunta hai")
});

// var alltoken = [ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3N0b21lciI6W3sicGFzc3dvcmQiOiJzaHdldGFAMTIzbmF2In1dLCJpYXQiOjE1NzgxMjE3NDV9.JpCWXAporxgYPb2mbmstI8VMAQ-ZV0l5ZBpGO6CXMjk',
// 'undefined; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3N0b21lciI6W3sicGFzc3dvcmQiOiIxMjM0NTY3OCJ9XSwiaWF0IjoxNTc4MTIxNzg1fQ.GopsB5EXXs6feSd9dgXW_x5s5BI5XXbDRXDYOziUE8c',
// 'undefined; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3N0b21lciI6W3sicGFzc3dvcmQiOiJAMTIzbmF2In1dLCJpYXQiOjE1NzgxMjE4MzJ9.FDkcxaYc5VW1rJqxrdhDrm2m2akFLluSJGdRLgBVYz0',
// 'undefined' ]
// // var token = alltoken.split('=')
// // console.log(token)
// var y = (alltoken[alltoken.length-2]);
// console.log(y);

