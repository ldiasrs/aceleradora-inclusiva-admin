module.exports = {
  deliveryProject: function(className, projectPath, deliveryName, file) {
    var deliverypath = deliveryName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_")
      .toLocaleLowerCase();
    const Repository = require("./Repository");
    console.log(
      `Saving and storing Delivery className: ${className}, projectName: ${projectPath},deliveryName: ${deliveryName},deliverypath: ${deliverypath}`
    );
    Repository.saveDeliveryProject(deliveryName, deliverypath, projectPath);
    const FileStorage = require("./FileStorage");
    FileStorage.storeFile(deliverypath, className, projectPath, file);
  }
};
