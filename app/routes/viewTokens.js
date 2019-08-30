
const Repository = require("../domain/Repository")

module.exports = function (app) {
    app.get('/viewTokens', function (req, res) {
         console.log(`/viewTokens - Accessing with id:${req.query.id}`)
        Repository.findAllActiveTokens(req.query.id, function (err, tokens) {
            res.render('viewTokens', { tokens: tokens , filterId: req.query.id});
        });
    });
}