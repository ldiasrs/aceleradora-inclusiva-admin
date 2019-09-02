const DeliveryProject = require("../domain/DeliveryProject")
module.exports = function (app) {

    app.get('/deliveryWork', function (req, res) {
        tokenNormalized = (req.query.token !== undefined) ? req.query.token.replace(/ /g, "+") : ""
        console.log(`/GET-deliveryWork - Accessing view with Token: " + ${tokenNormalized}`)
        res.render('deliveryWork', { errorMsg: null, successMsg: null, token: tokenNormalized });
    });

    app.post('/deliveryWork', function (req, res) {
        console.log(`/POST-deliveryWork - Token: " + ${req.body.token}, Zip File:  ${req.files.fileInput.name}`)
            DeliveryProject.deliveryProject(req.body.token, req.files.fileInput, function (deliveriedRes) {
            if (deliveriedRes.tokenExist) {
                console.log(`/POST-deliveryWork - studentName:${deliveriedRes.studentName},projectName: ${deliveriedRes.projectName}`)
                res.render('deliveryWork', { successMsg: `Olá ${deliveriedRes.studentName}, seu trabalho '${deliveriedRes.projectName}' foi entregue com sucesso :)`, errorMsg: null, token: '' });
            } else {
                console.log(`/POST-deliveryWork - Invalid Token: " + ${req.body.token}`)
                res.render('deliveryWork', { errorMsg: "Token não encontrado :(", token: req.body.token, successMsg: null });
            }
        });
    });
}