module.exports = {
  deliveryProject: function(
    className,
    projectName,
    deliveryName,
    file
  ) {
    const FileStorage = require("./FileStorage");
    FileStorage.storeFile(deliveryName, className, projectName, file);
  }
};
