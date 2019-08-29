const Repository = require("../domain/Repository")
const commitProject = require("../domain/GitHubCommiter")
module.exports = function (app) {
    repository = new Repository();

    app.get('/deliveryWork', function (req, res) {
        tokenNormalized = (req.query.token !== undefined) ? req.query.token.replace(/ /g,"+") : ""
        console.log(`/GET-deliveryWork - Accessing view with Token: " + ${tokenNormalized}`)
        res.render('deliveryWork', { errorMsg: null, successMsg: null, token: tokenNormalized });
    });

    app.post('/deliveryWork', function (req, res) {
        console.log(`/POST-deliveryWork - Token: " + ${req.body.token}, Zip File:  ${req.files.fileInput.name}`)
        repository.tokenExist(req.body.token, function (err, tokenExist) {
            if (tokenExist) {
                repository.findStandentAndProjectNameByToken(req.body.token,function(err, row){
                    console.log(`/POST-deliveryWork - studantName:${row.studantName},projectName: ${row.projectName}`)
                    repository.markTokenAsDelivered(req.body.token);
                    commitProject(req.body.token, row.studantName, row.className, row.projectName, req.files.fileInput)
                    res.render('deliveryWork', {successMsg: `Olá ${row.studantName}, seu trabalho '${row.projectName}' foi entregue com sucesso :)`, errorMsg: null, token: ''});
                });
            } else {
                console.log(`/POST-deliveryWork - Invalid Token: " + ${req.body.token}`)
                res.render('deliveryWork', { errorMsg: "Token não encontrado :(", token: req.body.token , successMsg: null});
            }
        });
    });
}