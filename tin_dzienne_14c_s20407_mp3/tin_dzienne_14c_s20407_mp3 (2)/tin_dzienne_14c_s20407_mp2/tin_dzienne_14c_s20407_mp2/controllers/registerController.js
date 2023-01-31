const { request } = require("express");
const RegisterRepository = require("../repository/sequelize/RegisterRepository");
const ClientRepository = require("../repository/sequelize/ClientRepository");
const LocationRepository = require("../repository/sequelize/LocationRepository");

exports.showRejestracjaList = (req, res, next) => {
  // res.render('pages/Register/list', {navLocation: 'register'})
  RegisterRepository.getRejestracje().then((registers) => {
    res.render("pages/register/list", {
      registers: registers,
      navLocation: "register",
      pageTitle: req.__('rejestracja.form.list.pageTitle')
    });
  });
};

exports.showRejestracjaForm = (req, res, next) => {
  let allClients, alllocations;
  ClientRepository.getKlienci()
    .then((clients) => {
      allClients = clients;
      return LocationRepository.getLokalizacje();
    })
    .then((locations) => {
      alllocations = locations;
      res.render("pages/register/form", {
        Register: {},
        formMode: "createNew",
        allClients: allClients,
        alllocations: alllocations,
        pageTitle: req.__('rejestracja.form.add.pageTitle'),
        btnLabel: req.__('rejestracja.form.add.btnLabel'),
        formAction: "/register/add",
        navLocation: "register",
        validationErrors: [],
      });
    });
  //res.render('pages/Register/form', {navLocation: 'register'})
};

exports.showRejestracjaDetails = (req, res, next) => {
  let allClients, alllocations;
  //res.render('pages/Register/form-detail', {navLocation: 'register'})
  const registerId = req.params.registerId;

  ClientRepository.getKlienci()
    .then((clients) => {
      allClients = clients;
      return LocationRepository.getLokalizacje();
    })
    .then((locations) => {
      alllocations = locations;
      return RegisterRepository.getRejestracjeById(registerId);
    })
    .then((Register) => {
      res.render("pages/register/form", {
        Register: Register,
        formMode: "showDetails",
        allClients: allClients,
        alllocations: alllocations,
        pageTitle: req.__('rejestracja.form.detials.pageTitle'),
        formAction: "",
        navLocation: "register",
        validationErrors: [],
      });
    });
};

exports.showRejestracjaEdit = (req, res, next) => {
  //res.render('pages/Register/form-edit', {navLocation: 'register'})
  let allClients, alllocations;
  const registerId = req.params.registerId;

  ClientRepository.getKlienci()
    .then((clients) => {
      allClients = clients;
      return LocationRepository.getLokalizacje();
    })
    .then((locations) => {
      alllocations = locations;
      return RegisterRepository.getRejestracjeById(registerId);
    })
    .then((Register) => {
      res.render("pages/register/form", {
        Register: Register,
        formMode: "edit",
        allClients: allClients,
        alllocations: alllocations,
        pageTitle: req.__('rejestracja.form.edit.pageTitle'),
        btnLabel: req.__('rejestracja.form.edit.btnLabel'),
        formAction: "/register/form-edit",
        navLocation: "register",
        validationErrors: [],
      });
    });
};

exports.addRejestracje = (req, res, next) => {
  let allClients, alllocations;
  const RegisterData = { ...req.body };
  

  RegisterData.client_id = RegisterData.client;
  RegisterData.location_id = RegisterData.location;

  ClientRepository.getKlienci()
    .then((clients) => {
      allClients = clients;
      return LocationRepository.getLokalizacje();
    })
    .then((locations) => {
      alllocations = locations;
      return RegisterRepository.createRejestracje(RegisterData);
    })
    .then((result) => {
      res.redirect("/register");
    })
    .catch((err) => {
      console.log(err);
      res.render("pages/register/form", {
        Register: RegisterData,
        pageTitle: req.__('rejestracja.form.add.pageTitle'),
        formMode: "createNew",
        allClients: allClients,
        alllocations: alllocations,
        btnLabel: req.__('rejestracja.form.add.btnLabel'),
        formAction: "/register/add",
        navLocation: "register",
        validationErrors: err.errors,
      });
    });
};

exports.updateRejestracje = (req, res, next) => {
  let allClients, alllocations;
  const registerId = req.body._id;
  const locationData = { ...req.body };

  // const qwe = {
  //   id: locationData._id,
  // }

  ClientRepository.getKlienci()
    .then((clients) => {
      allClients = clients;
      return LocationRepository.getLokalizacje();
    })
    .then((locations) => {
      alllocations = locations;
      return RegisterRepository.updateRejestracje(registerId, locationData);
    })
    .then((result) => {
      res.redirect("/register");
    })
    .catch((err) => {
      console.log(err);
      res.render("pages/register/form", {
        Register: locationData,
        pageTitle: req.__('rejestracja.form.edit.pageTitle'),
        formMode: "edit",
        allClients: allClients,
        alllocations: alllocations,
        btnLabel:req.__('rejestracja.form.edit.btnLabel'),
        formAction: "/register/form-edit",
        navLocation: "register",
        validationErrors: err.errors,
      });
    });
};

exports.deleteRejestracje = (req, res, next) => {
  const registerId = req.params.registerId;
  RegisterRepository.deleteRegister(registerId)
    .then(() => {
      res.redirect("/register");
    })
    .catch((err) => {
      res.render("pages/register/form", {
        register: registerId,
        pageTitle: req.__('rejestracja.form.delete.pageTitle'),
        formMode: "edit",
        btnLabel: "Edytuj Register",
        formAction:  req.__('rejestracja.form.delete.btnLabel'),
        navLocation: "register",
        validationErrors: err.errors,
      });
    });
};
