const Repository = require("./Repository")
const AES = require("crypto-js/aes");

class Token {

    constructor(studentId, projectId) {
        this.studentId = studentId;
        this.projectId = projectId;
        this.createdDate = new Date()
        this.token = this.createToken();
    }

    createToken() {
        var key =  `studentId:${this.studentId},projectId:${this.projectId}`
        return AES.encrypt(key, '#this-password-must-be-on-env').toString()
    }
}

function generateTokens (studantIds, projectId) {
    var list = [];
    if (Array.isArray(studantIds)) {
        studantIds.forEach(function (studantId) {
            list.push(new Token(studantId, projectId))
        });
    } else {
        list.push(new Token(studantIds, projectId))
    }
    return list;
}

generateAndSaveTokens = function(studantIds, projectId, callback) {
    tokens  = generateTokens(studantIds, projectId);
    new Repository().saveTokens(tokens, callback);
}

getTokenConfig = function(callback) {
    repository.findCurrentClass(function (erro, currentClass) {
        repository.findAllActiveProjects(function (errorSts, projects) {
            repository.findAllStudandsOfClass(currentClass.id, function (stError, studants) {
                callback({
                    projects: projects,
                    studants: studants,
                    className: currentClass.className 
                })
            });
        });
    });
}

module.exports = {generateAndSaveTokens, getTokenConfig}