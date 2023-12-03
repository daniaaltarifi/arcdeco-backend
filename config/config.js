const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "arcdeco"
});
module.exports=db
