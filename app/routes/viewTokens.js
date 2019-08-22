
const Repository = require("../domain/Repository")

module.exports = function (app) {
    app.get('/viewTokens', function (req, res) {
        var repository = new Repository();
        repository.findAllActiveTokens(req.query.id, function (err, tokens) {
            res.render('viewTokens', { tokens: tokens });
        });
    });
}