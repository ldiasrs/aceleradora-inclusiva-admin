module.exports = {
  getDeliveryProjectInfo: function(callback) {
    const Repository = require("./Repository");
    console.log(`/getDeliveryProjectInfo`);
    Repository.findAllActiveProjects(function(error, projects) {
      Repository.findCurrentClass(function(errClass, currentClass) {
        callback({
            errorMsg: null,
            successMsg: null,
            turmaCorrente: currentClass.className,
            projects: projects
        });
      });
    });
  },

  deliveryProject: function(
    projectId,
    deliveryName,
    fileName,
    callback
  ) {
    const deliveryProject = require("./DeliveryProject");
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
