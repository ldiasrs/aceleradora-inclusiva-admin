const DB = require("../config/dbConnection")
module.exports = {

    saveDeliveryProject: function (deliveredName, deliveredPath, projectPath) {
        let sql = "INSERT INTO DeliveriedProject(createdDate,deliveredName,deliveredPath,projectId) VALUES(datetime('now'),?,?, (SELECT id FROM Project WHERE projectPath=?))"
        var stmt = DB.prepare(sql);
        stmt.run([deliveredName, deliveredPath, projectPath]);
        stmt.finalize();
    },

    findCurrentClass: function (callback) {
        let sql = "SELECT * FROM ClassInfo WHERE current=1"
        DB.get(sql, (err, row) => {
            callback(err, row)
        });
    },

    findAllActiveProjects: function (callback) {
        let sql = "SELECT * FROM Project WHERE active=1"
        DB.all(sql, (err, rows) => {
            if (err) {
                console.log(`Error findAllActiveProjects, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },

    findAllStudandsOfClass: function (classId, callback) {
        let sql = "SELECT * FROM Student WHERE classId=?"
        DB.all(sql, [classId], (err, rows) => {
            if (err) {
                console.log(`Error findAllStudandsOfClass, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },

    findCurrentClassWithAllProjectsAndStudants: function (callback) {
        var sql = "" +
            "SELECT " +
            "       st.deliveredName AS studentName, " +
            "       st.deliveredPath AS studentPath, " +
            "       pj.projectName AS projectName, " +
            "       pj.projectPath AS projectPath, " +
            "       pj.projectDescription AS projectDescription, " +
            "       pj.picturePath AS picturePath, " +
            "       cls.className AS className, " +
            "       cls.classPath AS classPath  " +
            "FROM   DeliveriedProject st " +
            "       INNER JOIN Project pj ON st.projectId = pj.id " +
            "       INNER JOIN ClassInfo cls ON cls.current=1";

        DB.all(sql, (err, rows) => {
            if (err) {
                console.log(`Error findCurrentClassWithAllProjectsAndStudants, ERROR: ${err}`)
                return
            }
            callback(err, rows)
        });
    },

}