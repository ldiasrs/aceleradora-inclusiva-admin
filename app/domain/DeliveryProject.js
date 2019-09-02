const Repository = require("./Repository")
const FileStorage = require("./FileStorage")

deliveryProject = function (token, file, callback) {
    Repository.tokenExist(token, function (err, tokenExist) {
        if (tokenExist) {
            Repository.findStandentAndProjectNameByToken(token, function (err, row) {
                console.log(`Delivering token- studentName:${row.studentName}, projectName: ${row.projectName}, token: ${token}`)
                Repository.markTokenAsDelivered(token);
                FileStorage.storeFile(token, row.studentName, row.className, row.projectName, file)
                callback({ tokenExist: tokenExist, studentName: row.studentName, projectName: row.projectName })
            });
        } else {
            callback({ tokenExist: tokenExist })
        }
    });
}
module.exports = {deliveryProject}