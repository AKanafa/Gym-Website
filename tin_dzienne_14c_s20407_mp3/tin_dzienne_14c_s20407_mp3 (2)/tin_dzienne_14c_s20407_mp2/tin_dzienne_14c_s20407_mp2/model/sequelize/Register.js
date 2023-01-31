const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Register = sequelize.define("Register", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  client_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
    },
  },
  location_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
    },
  },
  oplacony: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  data1: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
      isAfter: {
        args: new Date().toDateString(),
        msg: "requiredDateNumber",
      },
    },
  },
  numerKarnetu: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
      min: {
        args: [1],
        msg: "fieldRequiredRangeCard",
      },
      max: {
        args: [9999],
        msg: "fieldRequiredRangeCard",
      },
    },
  },
  
});

module.exports = Register;
