const DB = require("../config/dbConnection")
module.exports = {

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

}