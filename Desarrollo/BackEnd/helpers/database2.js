var mysql = require('mysql');
var db2=null;

module.exports = function () {
    if(!db2) {        
         db2 = mysql.createPool({
                 host     : process.env.DB_HOST2,
                 user     : process.env.DB_USER2,
                 password : process.env.DB_PASSWORD2,
                 database : process.env.DB_DATABASE2,
                 connectionLimit: 10,
                 supportBigNumbers: true,
                 multipleStatements: true
        });   
    }
    return db2;
};