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

knex.schema.hasTable("saveForLater").then((exists) => {
    if (!exists) {
        knex.schema.createTable("saveForLater", (table) => {
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

// const options = {
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: "navgurukul",
//         database: "turing"
//     }
// }

// const knex = require('knex')(options);

// knex.schema.createTable("saveForLater", (table) => {
//     table.increments("item_id")
//     table.increments("cart_id")
//     table.increments("product_id")
//     table.increments("buy_now")
//     table.increments("added_on")
//     table.string("attributes")
//     table.increments("quantity")
// }).then(() => console.log("table created"))
//     .catch((err) => { 
//         console.log(err); throw err 
//     })
