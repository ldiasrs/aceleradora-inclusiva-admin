var fs = require('fs');

const dataWorkDir = 'data-works';


function createIfNotExist(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`FileUploader - Creating folder: ${dir}`)
        fs.mkdirSync(dir);
    }
}

storeFile = function (token, studantName, className, projectName, file) {

    var classDir = `${dataWorkDir}/${className}`
    var projectDir = `${classDir}/${projectName}`
    var studantDir = `${projectDir}/${studantName}`
    
    createIfNotExist(dataWorkDir);
    createIfNotExist(classDir);
    createIfNotExist(projectDir);
    createIfNotExist(studantDir);

    console.log(`FileUploader - Moving file  ${file.name} to dir ${studantDir}.`)
    file.mv(`${studantDir}/${file.name}`, function (err) {
        if (err) {
            console.log(`FileUploader - Error moving file ${file.name} to dir ${studantDir}. Error: ${err}`)
            return res.status(500).send(err);;
        }
    });
};

module.exports = {storeFile}