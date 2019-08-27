const Repository = require("../domain/Repository")
const commitProject = require("../domain/GitHubCommiter")
module.exports = function (app) {
    repository = new Repository();

    app.get('/deliveryWork', function (req, res) {
        res.render('deliveryWork', { errorMsg: null, successMsg: null, token: req.query.token });
    });

    app.post('/deliveryWork', function (req, res) {
        console.log("Token: " + req.body.token)
        console.log("Zip File: " + req.files.fileInput.name)
        repository.tokenExist(req.body.token, function (err, tokenExist) {
            if (tokenExist) {
                repository.findStandentAndProjectNameByToken(req.body.token,function(err, row){
                    repository.markTokenAsDelivered(req.body.token);
                    commitProject(req.body.token, row.studantName, row.className, row.projectName, req.files.fileInput)
                    res.render('deliveryWork', {successMsg: `Olá ${row.studantName}, seu trabalho '${row.projectName}' foi entregue com sucesso :)`, errorMsg: null, token: ''});
                });
            } else {
                res.render('deliveryWork', { errorMsg: "Token não encontrado :(", token: req.body.token , successMsg: null});
            }
        });
    });
}