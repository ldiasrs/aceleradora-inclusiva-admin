const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");

module.exports = class ProjectDeliveryToken {

    constructor(studentId, projectId) {
        this.studentId = studentId;
        this.projectId = projectId;
        this.createdDate = new Date()
        this.generateToken()
    }
    
    generateToken() {
        var key =  `studentId:${this.studentId} projectId:${this.projectId} createdDate:${this.createdDate}`
        this.token = AES.encrypt(key, '#this-password-must-be-on-env').toString()
    }

    static decryptToken(token) {
       var bytes  = AES.decrypt(token, '#this-password-must-be-on-env')
       return  bytes.toString(CryptoJS.enc.Utf8);
    }

    static generateProjectDeliveries(studantIds, projectId) {
        //TODO validate input
        //TODO test?
        var list = [];
        if (Array.isArray(studantIds)) {
            studantIds.forEach(function (studantId) {
                list.push(new ProjectDeliveryToken(studantId, projectId))
            });
        } else {
            list.push(new ProjectDeliveryToken(studantIds, projectId))
        }
        //FIXME remove this line
        list.forEach(function (token) { console.log("Decript: " + ProjectDeliveryToken.decryptToken(token.token)) })
        return list;
    }
}