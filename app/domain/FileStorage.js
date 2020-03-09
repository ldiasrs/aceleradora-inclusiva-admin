var fs = require('fs');

const dataWorkDir = '../aceleradora-inclusiva-showcase-web/public/pages';

function createIfNotExist(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`FileUploader - Creating folder: ${dir}`)
        fs.mkdirSync(dir);
    }
}

storeFile = function (studentName, className, projectName, file, callback) {

    var classDir = `${dataWorkDir}/${className}`
    var projectDir = `${classDir}/${projectName}`
    var studentDir = `${projectDir}/${studentName}`
    
    createIfNotExist(dataWorkDir);
    createIfNotExist(classDir);
    createIfNotExist(projectDir);
    createIfNotExist(studentDir);

    console.log(`FileUploader - Moving file  ${file.name} to dir ${studentDir}.`)
    file.mv(`${studentDir}/${file.name}`, function (err) {
        if (err) {
            console.log(`FileUploader - Error moving file ${file.name} to dir ${studentDir}. Error: ${err}`)
        }
        callback(`${studentDir}/${file.name}`)
    });
};

module.exports = {storeFile}