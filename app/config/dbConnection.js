const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

const DB_PATH = 'app/db/upload-hmw.db'
//let db = new sqlite3.Database(':memory:');
function createConnection() {
    return new sqlite3.Database(DB_PATH, function (err) {
        if (err) {
            console.log(err)
            return
        }
        console.log('Connected to ' + DB_PATH + ' database.')

    });
}

let DB = createConnection()

module.exports = DB;