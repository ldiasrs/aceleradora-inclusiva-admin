
const Token = require("../domain/Token")

module.exports = function (app) {

    app.post('/generateToken', function (req, res) {
        console.log(`/POST-generateToken - Generating and saving - studants:${req.body.studants}, project:${req.body.project}`)
        Token.generateAndSaveTokens(req.body.studants, req.body.project, function () {
            console.log(`/POST-generateToken - Saving and redirecting - studants:${req.body.studants}, project:${req.body.project}`)
            res.redirect('/viewTokens');
        });
    });

    app.get('/generateToken', function (req, res) {
        console.log(`/GET-generateToken Accessing view`)
        Token.getTokenConfig(function(data){
            res.render('generateToken', data);
        });
    });

}