const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Locations = sequelize.define("Locations", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nazwa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
      len: {
        args: [2, 20],
        msg: "fieldRequiredRange",
      },
    },
  },
  iloscTrenerow: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
      min: {
        args: [1],
        msg: "fieldRequiredRangeNumber",
      },
      max: {
        args: [1000],
        msg: "fieldRequiredRangeNumber",
      },
    },
  },
  iloscMaszyn: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
      min: {
        args: [1],
        msg: "fieldRequiredRangeNumber",
      },
      max: {
        args: [1000],
        msg: "fieldRequiredRangeNumber",
      },
    },
  },
});

module.exports = Locations;
