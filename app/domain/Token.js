
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

function generateTokens (studentIds, projectId) {
    var list = [];
    if (Array.isArray(studentIds)) {
        studentIds.forEach(function (studentId) {
            list.push(new Token(studentId, projectId))
        });
    } else {
        list.push(new Token(studentIds, projectId))
    }
    return list;
}

generateAndSaveTokens = function(studentIds, projectId, callback) {
    let Repository = require("./Repository")
    tokens  = generateTokens(studentIds, projectId);
    Repository.saveTokens(tokens, callback);
}

getTokenConfig = function(callback) {
    const Repository = require("./Repository")
    Repository.findCurrentClass(function (erro, currentClass) {
        Repository.findAllActiveProjects(function (errorSts, projects) {
            Repository.findAllStudandsOfClass(currentClass.id, function (stError, students) {
                callback({
                    projects: projects,
                    students: students,
                    className: currentClass.className 
                })
            });
        });
    });
}

module.exports = {generateAndSaveTokens, getTokenConfig,generateTokens}