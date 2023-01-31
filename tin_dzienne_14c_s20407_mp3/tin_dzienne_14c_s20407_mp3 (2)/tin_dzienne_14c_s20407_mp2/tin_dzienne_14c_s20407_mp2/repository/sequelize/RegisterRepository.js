const Sequelize = require("sequelize");

const Client = require("../../model/sequelize/Client");
const Location = require("../../model/sequelize/Location");
const Register = require("../../model/sequelize/Register");

exports.getRejestracje = () => {
  return Register.findAll({
    include: [
      {
        model: Client,
        as: "client",
      },
      {
        model: Location,
        as: "location",
      },
    ],
  });
};

exports.getRejestracjeById = (registerId) => {
  return Register.findByPk(registerId, {
    include: [
      {
        model: Client,
        as: "client",
      },
      {
        model: Location,
        as: "location",
      },
    ],
  });
};

exports.createRejestracje = (data) => {
  if (data.oplacony == undefined) {
    data.oplacony = false;
  } else {
    data.oplacony = true;
  }
  console.log(JSON.stringify(data));

  return Register.create({
    client_id: data.client,
    location_id: data.location,
    oplacony: data.oplacony,
    data1: data.data1,
    numerKarnetu: data.numerKarnetu,
  });
};

exports.updateRejestracje = (registerId, data) => {
  if (data.oplacony == undefined) {
    data.oplacony = false;
  } else {
    data.oplacony = true;
  }
  data.client_id = data.client;
  data.location_id = data.location;

  return Register.update(data, { where: { _id: registerId } });
};

exports.deleteRegister = (registerId) => {
  return Register.destroy({
    where: { _id: registerId },
  });
};
