var mysql = require('mysql');
const config = require("../configs/config.js")


const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.db_name
});
  
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;