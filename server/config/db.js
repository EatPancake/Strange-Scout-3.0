const mysql = require('mysql');
const { default: Dashboard } = require('../../../nodescout/auth/src/components/Dashboard/Dashboard');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'yellow1',
    database:'nodelogin'
})

module.exports = connection;