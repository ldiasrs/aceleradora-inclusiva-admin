module.exports = {
  getDeliveryProjectInfo: function(callback) {
    const Repository = require("./Repository");
    console.log(`/getDeliveryProjectInfo`);
    Repository.findAllActiveProjects(function(error, projects) {
      Repository.findCurrentClass(function(errClass, currentClass) {
        callback({
            errorMsg: null,
            successMsg: null,
            turmaCorrente: currentClass.classPath,
            projects: projects
        });
      });
    });
  },

  deliveryProject: function(
    className,
    project,
    deliveryName,
    file,
    callback
  ) {
    const deliveryProject = require("./DeliveryProject");
    deliveryProject.deliveryProject(className, project, deliveryName, file);
    //TODO implementar integracao com a entrega
    const Repository = require("./Repository");
    console.log(`/getDeliveryProjectInfo`);
    Repository.findAllActiveProjects(function(error, projects) {
      Repository.findCurrentClass(function(errClass, currentClass) {
        callback({
            errorMsg: null,
            successMsg: `"${deliveryName}" entregue com sucesso \o/`,
            turmaCorrente: currentClass.className,
            projects: projects
        });
      });
    });
  }
};
