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

knex.schema.hasTable("product_review").then((exists) => {
    if (!exists) {
        knex.schema.createTable("product_review", (table) => {
            table.increments("product_id")
            table.string("name")
            table.string("review")
            table.string("rating")
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
})

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

// knex.schema.createTable("product_review", (table) => {
//     table.increments("rating")
//     table.increments("created_on")
//     table.string("name")
//     table.string("review")
// }).then(() => console.log("table created"))
//     .catch((err) => { console.log(err); throw err })