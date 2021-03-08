const mysql = require("mysql");

const pool = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
})

pool.connect( (error) => {
    if(error){
        console.log(error);
    }else {
        console.log('Successfully connected !!');
    }
});

module.exports = pool;