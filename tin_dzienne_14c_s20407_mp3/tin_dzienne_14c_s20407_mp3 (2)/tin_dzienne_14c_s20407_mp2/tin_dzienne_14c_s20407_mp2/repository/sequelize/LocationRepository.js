const Client = require("../../model/sequelize/Client");
const Location = require("../../model/sequelize/Location");
const Register = require("../../model/sequelize/Register");

exports.getLokalizacje = () => {
  return Location.findAll();
};

exports.getLokalizacjaById = (locationID) => {
  return Location.findByPk(locationID, {
    include: [
      {
        model: Register,
        as: "Registers",
        include: [
          {
            model: Client,
            as: "client",
          },
        ],
      },
    ],
  });
};

exports.createLokalizacja = (newlocationData) => {
  var check = false;
  if (newlocationData.iloscMaszyn == undefined) {
    check = false;
  } else {
    check = true;
  }
  return Location.create({
    nazwa: newlocationData.nazwa,
    iloscTrenerow: newlocationData.iloscTrenerow,
    iloscMaszyn: newlocationData.iloscMaszyn,
  });
};

exports.updateLokalizacja = (locationID, locationData) => {
  var check = false;
  if (locationData.iloscMaszyn == undefined) {
    locationData.iloscMaszyn = false;
  } else {
    locationData.iloscMaszyn = true;
  }
  

  return Location.update(locationData, { where: { _id: locationID } });
};

exports.deleteLokalizacja = (locationID) => {
  return Location.destroy({
    where: { _id: locationID },
  });
};
