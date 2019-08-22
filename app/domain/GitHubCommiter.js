var fs = require('fs');

const dataWorkDir = 'data-works';

module.exports = function commitProject(token, studantName, className, projectName, file) {
    var classDir = `${dataWorkDir}/${className}`
    var projectDir = `${classDir}/${projectName}`
    var studantDir = `${projectDir}/${studantName}`

     createIfNotExist(dataWorkDir);
     createIfNotExist(classDir);
     createIfNotExist(projectDir);
     createIfNotExist(studantDir);
    

    // Use the mv() method to place the file somewhere on your server
    file.mv(`${studantDir}/${file.name}`, function(err) {
        if (err)
            return res.status(500).send(err);;
    });
};

function createIfNotExist(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Creating folder: ${dir}`)
        fs.mkdirSync(dir);
    }
}

