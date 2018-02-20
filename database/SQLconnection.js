const mysql = require('mysql')

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    databse: 'greenfield'
})

db.connect((err)=> {
    if (err) {
        console.log(err)
    } else {
        console.log('db connected')
    }
})

module.exports = connection;