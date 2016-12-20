var mysql = require('mysql');
var db=null;

module.exports = function () {
    if(!db) {    
         db = mysql.createPool({
                 host     : process.env.DB_HOST,
                 user     : process.env.DB_USER,
                 password : process.env.DB_PASSWORD,
                 database : process.env.DB_DATABASE,
                 connectionLimit: 10,
                 supportBigNumbers: true,
                 multipleStatements: true
        });   
    }
    return db;
};

