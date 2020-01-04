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

knex.schema.hasTable("orders").then((exists) => {
    if (!exists) {
        return knex.schema.createTable("orders", (table) => {
            table.increments("Cart_ID")
            table.increments("Shipping_ID")
            table.increments("Tax_ID")
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
})