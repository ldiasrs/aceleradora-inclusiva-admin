const ProjectDeliveryToken = require("./ProjectDeliveryToken")
const DB = require("../config/dbConnection")

module.exports = class Repository {

    generateProjectDeliveries(studantIds, projectIds) {
        //TODO validate input
        //TODO test?
        var list = [];
        if (Array.isArray(studantIds)) {
            studantIds.forEach(function (studantIds) {
                list.push(new ProjectDeliveryToken(studantIds, projectIds))
            });
        } else {
            list.push(new ProjectDeliveryToken(studantIds, projectIds))
        }
        //FIXME remove this line
        list.forEach(function (token) { console.log(token.decryptToken()) })
        //TODO save the list
        return list;
    }

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
                console.log(err)
                return
            }
            callback(err, rows)
        });
    }

    findAllStudandsOfClass(classId, callback) {
        let sql = "SELECT * FROM Student WHERE classId=?"
        DB.all(sql, [classId], (err, rows) => {
            if (err) {
                console.log(err)
                return
            }
            callback(err, rows)
        });
    }

    saveProjectDeliveryToken(tokens, callback) {
        console.log("saveProjectDeliveryToken")
        let sql = "INSERT INTO ProjectDeliveryToken(studentId,projectId,createdDate,token) VALUES(?,?,datetime('now'),?)"
        DB.serialize(function () {
            var stmt = DB.prepare(sql);
            tokens.forEach(function (token) {
                console.log("DeliveryToken Inserting:" + token.studentId)
                stmt.run([token.studentId, token.projectId, token.token]);
            });
            stmt.finalize();
            console.log("DeliveryToken finalize")
            callback()
        });
    }

    tokenExist(token, callback) {
        let sql = "SELECT count(*) as count FROM ProjectDeliveryToken WHERE token=?"

        DB.get(sql, [token.trim()], (err, row) => {
            console.log(row.count)
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
            + "LEFT JOIN DeliveriedProject delivery ON token.id = delivery.deliveryTokenId "
            + "WHERE delivery.deliveryTokenId IS NULL "
            + "ORDER by token.createdDate desc"

        var sql = baseSql.replace("@STUDANT_FILTER", studantId? "AND st.id = ? " : "")
    
        DB.all(sql, studantId, (err, rows) => {
            if (err) {
                console.log(err)
                return
            }
            callback(err, rows)
        });
    }
}