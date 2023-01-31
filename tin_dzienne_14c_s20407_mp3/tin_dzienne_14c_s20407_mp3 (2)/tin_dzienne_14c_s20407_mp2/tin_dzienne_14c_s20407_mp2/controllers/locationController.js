const { request } = require("express");
const LocationRepository = require("../repository/sequelize/LocationRepository");

exports.showLokalizacjaList = (req, res, next) => {
  
  LocationRepository.getLokalizacje().then((locations) => {
    res.render("pages/location/list", {
      locations: locations,
      navLocation: "location",
    });
  });
};

exports.showLokalizacjaForm = (req, res, next) => {
  res.render("pages/location/form", {
    location: {},
    pageTitle: req.__('lokalizacja.form.add.pageTitle'),
    formMode: "createNew",
    btnLabel: req.__('lokalizacja.form.add.btnLabel'),
    formAction: "/location/add",
    navLocation: "location",
    validationErrors: [],
  });
};

exports.showLokalizacjaDetails = (req, res, next) => {
  const locationID = req.params.locationID;
  LocationRepository.getLokalizacjaById(locationID).then((location) => {
    res.render("pages/location/form", {
      location: location,
      formMode: "showDetails",
      pageTitle: req.__('lokalizacja.form.detail.pageTitle'),
      formAction: "",
      navLocation: "location",
      validationErrors: [],
    });
  });
};

exports.showLokalizacjaEdit = (req, res, next) => {
  const locationID = req.params.locationID;
  LocationRepository.getLokalizacjaById(locationID).then((location) => {
    res.render("pages/location/form", {
      location: location,
      formMode: "edit",
      pageTitle: req.__('lokalizacja.form.edit.pageTitle'),
      btnLabel: req.__('lokalizacja.form.edit.btnLabel'),
      formAction: "/location/form-edit",
      navLocation: "location",
      validationErrors: [],
    });
  });
};

exports.addLokalizacja = (req, res, next) => {
  const locationData = { ...req.body };
  LocationRepository.createLokalizacja(locationData)
    .then((result) => {
      res.redirect("/location");
    })
    .catch((err) => {
      res.render("pages/location/form", {
        location: locationData,
        pageTitle: req.__('lokalizacja.form.add.pageTitle'),
        formMode: "createNew",
        btnLabel: req.__('lokalizacja.form.add.btnLabel'),
        formAction: "/location/add",
        navLocation: "location",
        validationErrors: err.errors,
      });
    });
};

exports.updateLokalizacja = (req, res, next) => {
  const locationID = req.body._id;
  const locationData = { ...req.body };
  LocationRepository.updateLokalizacja(locationID, locationData)
    .then((result) => {
      res.redirect("/location");
    })
    .catch((err) => {
      res.render("pages/location/form", {
        location: locationData,
        pageTitle:  req.__('lokalizacja.form.edit.pageTitle'),
        formMode: "edit",
        btnLabel: req.__('lokalizacja.form.edit.btnLabel'),
        formAction: "/location/form-edit",
        navLocation: "location",
        validationErrors: err.errors,
      });
    });
};

exports.deleteLokalizacja = (req, res, next) => {
  const locationID = req.params.locationID;
  LocationRepository.deleteLokalizacja(locationID).then(() => {
    res.redirect("/location");
  });
};
