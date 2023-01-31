const LocationRepository = require("../repository/sequelize/LocationRepository");

exports.getLokalizacja = (req, res, next) => {
  LocationRepository.getLokalizacje()
    .then((loc) => {
      res.status(200).json(loc);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLokalizacjaById = (req, res, next) => {
  const locationID = req.params.locationID;
  LocationRepository.getLokalizacjaById(locationID).then((loc) => {
    if (!loc) {
      res.status(404).json({
        message: "Location with id: " + locationID + " not found",
      });
    } else {
      res.status(200).json(loc);
    }
  });
};

exports.createLokalizacja = (req, res, next) => {
  LocationRepository.createLokalizacja(req.body)
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

exports.updateLokalizacja = (req, res, next) => {
  const locationID = req.params.locationID;
  LocationRepository.updateLokalizacja(locationID, req.body)
    .then((result) => {
      res.status(204).json({ message: "Location updated!!", loc: result });
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};

exports.deleteLokalizacja = (req, res, next) => {
  const locationID = req.params.locationID;
  LocationRepository.deleteLokalizacja(locationID)
    .then((result) => {
      res.status(204).json({ message: "Removed location", loc: result });
    })
    .catch((err) => {
      if (!err.statuscode) {
        err.statuscode = 500;
      }
      next(err);
    });
};
