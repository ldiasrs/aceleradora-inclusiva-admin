
const Repository = require("../domain/Repository")
const ShowCaseClassMerger = require("../domain/ShowCaseClassMerger")

module.exports = function (app) {
    app.get('/viewTokens', function (req, res) {
        ShowCaseClassMerger.merge(function (rows){})
         console.log(`/viewTokens - Accessing with id:${req.query.id}`)
        Repository.findAllActiveTokens(req.query.id, function (err, tokens) {
            res.render('viewTokens', { tokens: tokens , filterId: req.query.id});
        });
    });
}