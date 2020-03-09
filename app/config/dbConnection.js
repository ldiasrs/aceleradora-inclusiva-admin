const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const Promise = require('bluebird')

const DB_PATH = (process.env.ACELERADORA_ADM_DB_NAME != null) ? process.env.ACELERADORA_ADM_DB_NAME : "database.db";

//let db  = new sqlite3.Database(':memory:');
function createConnection() {
    return new sqlite3.Database(DB_PATH,  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,  function (err) {
        if (err) {
            console.log(`Error on connecting to DB: ${err}`)
            return
        }
        console.log(`Connected to '${DB_PATH}' database.`)
        console.log(`URL para entregas: http://localhost:8080/entregar`)

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

module.exports = DB;