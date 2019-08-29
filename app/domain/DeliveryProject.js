const Repository = require("./Repository")
const FileStorage = require("./FileStorage")

deliveryProject = function (token, file, callback) {
    repository = new Repository()
    repository.tokenExist(token, function (err, tokenExist) {
        if (tokenExist) {
            repository.findStandentAndProjectNameByToken(token, function (err, row) {
                console.log(`/POST-deliveryWork - studantName:${row.studantName},projectName: ${row.projectName}`)
                repository.markTokenAsDelivered(token);
                FileStorage.storeFile(token, row.studantName, row.className, row.projectName, file)
                callback({ tokenExist: tokenExist, studantName: row.studantName, projectName: row.projectName })
            });
        } else {
            callback({ tokenExist: tokenExist })
        }
    });
}
module.exports = {deliveryProject}