const ClientRepository = require("../repository/sequelize/ClientRepository");

exports.getKlient = (req, res, next) => {
  ClientRepository.getKlienci()
    .then((cli) => {
      res.status(200).json(cli);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getKlientById = (req, res, next) => {
  const clientID = req.params.clientID;
  ClientRepository.getKlientById(clientID).then((cli) => {
    if (!cli) {
      res.status(404).json({
        message: "Klient with id: " + clientID + " not found",
      });
    } else {
      res.status(200).json(cli);
    }
  });
};

exports.createKlient = (req, res, next) => {
  ClientRepository.createKlient(req.body)
    .then((newObj) => {
      res.status(201).json(newObj);
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};

exports.updateKlient = (req, res, next) => {
  const clientID = req.params.clientID;
  ClientRepository.updateKlient(clientID, req.body)
    .then((result) => {
      res.status(204).json({ message: "Klient updated!!", cli: result });
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};

exports.deleteKlient = (req, res, next) => {
  const clientID = req.params.clientID;
  ClientRepository.deleteKlient(clientID)
    .then((result) => {
      res.status(204).json({ message: "Removed klient", cli: result });
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};
