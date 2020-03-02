const ServiceFacade = require("../domain/ServiceFacade");
module.exports = function(app) {
  app.get("/entregar", function(req, res) {
    console.log(`/GET-deliveryProject - New delivery delivery`);
    ServiceFacade.getDeliveryProjectInfo(function(info) {
      res.render("deliveryProject", info);
    });
  });

  app.post("/entregar", function(req, res) {
    console.log(
      `/POST-deliveryProject - NomeEntrega: " + ${req.body.nomeEntrega}, Projeto ID: ${req.body.project} Zip File:  ${req.files.fileInput.name}`
    );
    ServiceFacade.deliveryProject(
      req.body.project,
      req.body.nomeEntrega,
      req.files.fileInput.name,
      function(deliveriedRes) {
        res.render("deliveryProject", deliveriedRes);
      }
    );
  });
};
