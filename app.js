const express = require('express')
const app = express()
const port = 8080 

const mysql = require('mysql');
const config = require('./db_config.json');

var pool = mysql.createPool(config);
app.get('/', (req, res) => {
pool.getConnection(function(err, conn) {
  if(!err) {
        conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        res.send('It\'s Work! Solution : '+rows[0].solution);
        });
  }
  conn.release();
});
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
