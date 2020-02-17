var fs = require('fs');

const dataWorkDir = 'data-works';

function createIfNotExist(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`FileUploader - Creating folder: ${dir}`)
        fs.mkdirSync(dir);
    }
}

storeFile = function (token, studentName, className, projectName, file) {

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
            return res.status(500).send(err);;
        }
    });
};

module.exports = {storeFile}