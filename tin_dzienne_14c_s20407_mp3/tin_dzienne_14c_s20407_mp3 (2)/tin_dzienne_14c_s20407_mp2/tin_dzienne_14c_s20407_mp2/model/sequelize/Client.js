const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Clients = sequelize.define("Clients", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'fieldRequired',
      },
      len: {
        args: [2, 20],
        msg: "fieldRequiredRange",
      },
    },
  },
  pesel: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "fieldRequired",
      },
      min: {
        args: [10000000000],
        msg: "fieldRequiredRangePesel",
      },
      max: {
        args: [99999999999],
        msg: "fieldRequiredRangePesel",
      },
    },
  },
  zaszczepiony: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Clients;
