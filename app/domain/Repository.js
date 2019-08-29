const ProjectDeliveryToken = require("./ProjectDeliveryToken")
const DB = require("../config/dbConnection")

module.exports = class Repository {

    findCurrentClass(callback) {
        let sql = "SELECT * FROM ClassInfo WHERE current=1"
        DB.get(sql, (err, row) => {
            callback(err, row)
        });
    }

    findAllActiveProjects(callback) {
        let sql = "SELECT * FROM Project WHERE active=1"
        DB.all(sql, (err, rows) => {
            if (err) {
                console.log(`Error findAllActiveProjects, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    }

    findAllStudandsOfClass(classId, callback) {
        let sql = "SELECT * FROM Student WHERE classId=?"
        DB.all(sql, [classId], (err, rows) => {
            if (err) {
                console.log(`Error findAllStudandsOfClass, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    }

    saveProjectDeliveryToken(tokens, callback) {
        let sql = "INSERT INTO ProjectDeliveryToken(studentId,projectId,createdDate,token) VALUES(?,?,datetime('now'),?)"
        DB.serialize(function () {
            var stmt = DB.prepare(sql);
            tokens.forEach(function (token) {
                stmt.run([token.studentId, token.projectId, token.token]);
            });
            stmt.finalize();
            callback()
        });
    }

    markTokenAsDelivered(token) {
        let sql = "INSERT INTO DeliveriedProject(createdDate,token) VALUES(datetime('now'),?)"
        var stmt = DB.prepare(sql);
        stmt.run([token]);
        stmt.finalize();
    }

    tokenExist(token, callback) {
        let sql = "SELECT count(*) as count FROM ProjectDeliveryToken WHERE token=?"
        DB.get(sql, [token.trim()], (err, row) => {
            callback(err, (row.count > 0))
        });
    }

    findStandentAndProjectNameByToken(token, callback) {
        var sql = ""
            + "SELECT "
            + "       st.studantName AS studantName, "
            + "       pj.projectName AS projectName, "
            + "       cls.className AS className "
            + "FROM   ProjectDeliveryToken token "
            + "       INNER JOIN Student st "
            + "               ON st.id = token.studentid "
            + "       INNER JOIN project pj "
            + "               ON pj.id = token.projectid "
            + "       INNER JOIN ClassInfo cls "
            + "               ON cls.id = st.classId "
            + "WHERE  token.token = ?";

        DB.get(sql, [token.trim()], (err, row) => {
            callback(err, row)
        });
    }

    findAllActiveTokens(studantId, callback) {

        let baseSql = ""
            + "SELECT token.id AS id, "
            + "       strftime('%d-%m-%Y %H:%M:%S',token.createdDate) AS createdDate, "
            + "       token.token AS token, "
            + "       st.studantName AS studantName, "
            + "       pj.projectName AS projectName "
            + "FROM ProjectDeliveryToken token "
            + "INNER JOIN Student st ON st.id = token.studentId "
            + "INNER JOIN Project pj ON pj.id = token.projectId "
            + "@STUDANT_FILTER"
            + "LEFT JOIN DeliveriedProject delivery ON token.token = delivery.token "
            + "WHERE delivery.token IS NULL "
            + "ORDER by token.createdDate desc"

        var sql = baseSql.replace("@STUDANT_FILTER", studantId ? "AND st.id = ? " : "")

        DB.all(sql, studantId, (err, rows) => {
            if (err) {
                console.log(`Error findAllActiveTokens, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    }
}