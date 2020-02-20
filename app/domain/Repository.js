const DB = require("../config/dbConnection")
module.exports = {
    saveTokens : function (tokens, callback) {
        let sql = "INSERT INTO ProjectDeliveryToken(studentId,projectId,createdDate,token) VALUES(?,?,?,?)"
        DB.serialize(function () {
            var stmt = DB.prepare(sql);
            tokens.forEach(function (token) {
                stmt.run([token.studentId, token.projectId, token.createdDate, token.token]);
            });
            stmt.finalize();
            callback()
        });
    },

    findCurrentClass : function (callback) {
        let sql = "SELECT * FROM ClassInfo WHERE current=1"
        DB.get(sql, (err, row) => {
            callback(err, row)
        });
    },

    findAllActiveProjects : function (callback) {
        let sql = "SELECT * FROM Project WHERE active=1"
        DB.all(sql, (err, rows) => {
            if (err) {
                console.log(`Error findAllActiveProjects, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },

    findAllStudandsOfClass : function (classId, callback) {
        let sql = "SELECT * FROM Student WHERE classId=?"
        DB.all(sql, [classId], (err, rows) => {
            if (err) {
                console.log(`Error findAllStudandsOfClass, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },


    markTokenAsDelivered : function (token) {
        let sql = "INSERT INTO DeliveriedProject(createdDate,token) VALUES(datetime('now'),?)"
        var stmt = DB.prepare(sql);
        stmt.run([token]);
        stmt.finalize();
    },

    tokenExist : function (token, callback) {
        let sql = "SELECT count(*) as count FROM ProjectDeliveryToken WHERE token=?"
        DB.get(sql, [token.trim()], (err, row) => {
            callback(err, (row.count > 0))
        });
    },

    findCurrentClassWithAllProjectsAndStudants : function(callback) {
        var sql = ""
            + "SELECT "
            + "       st.studentName AS studentName, "
            + "       st.studentPath AS studentPath, "
            + "       pj.projectName AS projectName, "
            + "       pj.projectPath AS projectPath, "
            + "       pj.projectDescription AS projectDescription, "
            + "       pj.picturePath AS picturePath, "
            + "       cls.className AS className, "
            + "       cls.classPath AS classPath  "
            + "FROM   ClassInfo cls "
            + "       INNER JOIN Student st "
            + "               ON st.classId = cls.id AND cls.current=1"
            + "       LEFT JOIN Project pj "
            + "WHERE  pj.active = 1 ";

        DB.all(sql, (err, rows) => {
            if (err) {
                console.log(`Error findCurrentClassWithAllProjectsAndStudants, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },

    findStandentAndProjectNameByToken : function (token, callback) {
        var sql = ""
            + "SELECT "
            + "       st.studentName AS studentName, "
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
    },

    findAllActiveTokens : function (studentId, callback) {

        let baseSql = ""
            + "SELECT token.id AS id, "
            + "       strftime('%d-%m-%Y %H:%M:%S',token.createdDate) AS createdDate, "
            + "       token.token AS token, "
            + "       st.studentName AS studentName, "
            + "       pj.projectName AS projectName "
            + "FROM ProjectDeliveryToken token "
            + "INNER JOIN Student st ON st.id = token.studentId "
            + "INNER JOIN Project pj ON pj.id = token.projectId "
            + "@student_FILTER"
            + "LEFT JOIN DeliveriedProject delivery ON token.token = delivery.token "
            + "WHERE delivery.token IS NULL "
            + "ORDER by token.createdDate desc"

        var sql = baseSql.replace("@student_FILTER", studentId ? "AND st.id = ? " : "")

        DB.all(sql, studentId, (err, rows) => {
            if (err) {
                console.log(`Error findAllActiveTokens, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },
}