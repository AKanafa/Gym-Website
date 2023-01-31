const Client = require("../../model/sequelize/Client");
const Location = require("../../model/sequelize/Location");
const Register = require("../../model/sequelize/Register");

exports.getKlienci = () => {
  return Client.findAll();
};

exports.getKlientById = (clientId) => {
  return Client.findByPk(clientId, {
    include: [
      {
        model: Register,
        as: "Registers",
        include: [
          {
            model: Location,
            as: "location",
          },
        ],
      },
    ],
  });
};

exports.createKlient = (newclientData) => {
  return Client.create({
    name: newclientData.name,
    pesel: newclientData.pesel,
    zaszczepiony: newclientData.zaszczepiony,
  });
};

exports.updateKlient = (clientId, clientData) => {
  return Client.update(clientData, { where: { _id: clientId } });
};

exports.deleteKlient = (clientId) => {
  return Client.destroy({
    where: { _id: clientId },
  });
};
