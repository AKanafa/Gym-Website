const RegisterRepository = require("../repository/sequelize/RegisterRepository");

exports.getRejestracje = (req, res, next) => {
  RegisterRepository.getRejestracje()
    .then((reg) => {
      res.status(200).json(reg);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRejestracjeById = (req, res, next) => {
  const registerId = req.params.registerId;
  RegisterRepository.getRejestracjeById(registerId).then((reg) => {
    if (!reg) {
      res.status(404).json({
        message: "Rejestracja with id: " + registerId + " not found",
      });
    } else {
      res.status(200).json(reg);
    }
  });
};

exports.createRejestracje = (req, res, next) => {
  RegisterRepository.createRejestracje(req.body)
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

exports.updateRejestracje = (req, res, next) => {
  const registerId = req.params.registerId;
  RegisterRepository.updateRejestracje(registerId, req.body)
    .then((result) => {
      res.status(204).json({ message: "Rejestracja updated!!", reg: result });
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};

exports.deleteRegister = (req, res, next) => {
  const registerId = req.params.registerId;
  RegisterRepository.deleteRegister(registerId)
    .then((result) => {
      res.status(204).json({ message: "Removed rejestracja!!", reg: result });
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};
