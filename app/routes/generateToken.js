
const Token = require("../domain/Token")

module.exports = function (app) {

    app.post('/generateToken', function (req, res) {
        console.log(`/POST-generateToken - Generating and saving - students:${req.body.students}, project:${req.body.project}`)
        Token.generateAndSaveTokens(req.body.students, req.body.project, function () {
            console.log(`/POST-generateToken - Saving and redirecting - students:${req.body.students}, project:${req.body.project}`)
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