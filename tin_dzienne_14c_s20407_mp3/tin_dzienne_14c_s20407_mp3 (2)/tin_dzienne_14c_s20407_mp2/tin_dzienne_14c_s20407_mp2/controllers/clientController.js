const { request } = require("express");
const ClientRepository = require("../repository/sequelize/ClientRepository");

exports.showKlientList = (req, res, next) => {
  
  ClientRepository.getKlienci().then((clients) => {
    res.render("pages/client/list", {
      clients: clients,
      navLocation: "clients",
    });
  });
};

exports.showKlientForm = (req, res, next) => {
  
  res.render("pages/client/form", {
    clients: {},
    pageTitle:  req.__('client.form.add.pageTitle'),
    formMode: "createNew",
    btnLabel: req.__('client.form.add.btnLabel'),
    formAction: "/client/add",
    navLocation: "clients",
    validationErrors: [],
  });
};

exports.showKlientDetails = (req, res, next) => {
  
  const clientID = req.params.clientID;
  ClientRepository.getKlientById(clientID).then((clients) => {
    res.render("pages/client/form", {
      clients: clients,
      formMode: "showDetails",
      pageTitle: req.__('client.form.detail.pageTitle'),
      formAction: "",
      navLocation: "clients",
      validationErrors: [],
    });
  });
};

exports.showKlientEdit = (req, res, next) => {
  
  const clientID = req.params.clientID;
  ClientRepository.getKlientById(clientID).then((clients) => {
    res.render("pages/client/form", {
      clients: clients,
      formMode: "edit",
      pageTitle: req.__('client.form.edit.pageTitle'),
      btnLabel: req.__('client.form.edit.btnLabel'),
      formAction: "/client/form-edit",
      navLocation: "clients",
      validationErrors: [],
    });
  });
};

exports.addKlient = (req, res, next) => {
  const clientData = { ...req.body };
  ClientRepository.createKlient(clientData)
    .then((result) => {
      res.redirect("/client");
    })
    .catch((err) => {
      res.render("pages/client/form", {
        clients: clientData,
        pageTitle: req.__('client.form.add.pageTitle'),
        formMode: "createNew",
        btnLabel: req.__('client.form.add.btnLabel'),
        formAction: "/client/add",
        navLocation: "clients",
        validationErrors: err.errors,
      });
    });
};

exports.updateKlient = (req, res, next) => {
  const clientID = req.body._id;
  const clientData = { ...req.body };
  ClientRepository.updateKlient(clientID, clientData)
    .then((result) => {
      res.redirect("/client");
    })
    .catch((err) => {
      res.render("pages/client/form", {
        clients: clientData,
        pageTitle: req.__('client.form.edit.pageTitle'),
        formMode: "edit",
        btnLabel: req.__('client.form.edit.btnLabel'),
        formAction: "/client/form-edit",
        navLocation: "clients",
        validationErrors: err.errors,
      });
    });
};

exports.deleteKlient = (req, res, next) => {
  const clientID = req.params.clientID;
  ClientRepository.deleteKlient(clientID).then(() => {
    res.redirect("/client");
  });
};
