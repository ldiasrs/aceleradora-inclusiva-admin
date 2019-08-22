
const Repository = require("../domain/Repository")
const ProjectDeliveryToken = require("../domain/ProjectDeliveryToken")

module.exports = function (app) {
    const repository = new Repository();
    app.post('/generateToken', function (req, res) {
        var tokens = ProjectDeliveryToken.generateProjectDeliveries(req.body.studants, req.body.project);
        repository.saveProjectDeliveryToken(tokens, function () {
            console.log("Rendering view tokens")
            res.redirect('/viewTokens');
        });
    });
    app.get('/generateToken', function (req, res) {
        repository.findCurrentClass(function (erro, currentClass) {
            repository.findAllActiveProjects(function (errorSts, projects) {
                repository.findAllStudandsOfClass(currentClass.id, function (stError, studants) {
                    res.render('generateToken', { projects: projects, studants: studants, className: currentClass.className });
                });
            });
        });
    });

}