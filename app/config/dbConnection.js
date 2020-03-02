const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const Promise = require('bluebird')

const DB_PATH = 'database.db'
//let db = new sqlite3.Database(':memory:');
function createConnection() {
    return new sqlite3.Database(DB_PATH,  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,  function (err) {
        if (err) {
            console.log(`Error on connecting to DB: ${err}`)
            return
        }
        console.log(`Connected to '${DB_PATH}' database.`)

    });
}

function migrate(dataFile) {
    console.log(`Migranting SQL file: ${dataFile}`)
    fs.readFile(dataFile, 'utf8', function(err, dbSchema) {
        if (err) throw err;
        DB.exec(dbSchema, function(err){
            if (err) {
                console.log(err)
            }
        });
    });
}


let DB = createConnection()


//migrate('app/migrations/001-initial.sql')
//migrate('app/migrations/002-insert-students.sql')

module.exports = DB;