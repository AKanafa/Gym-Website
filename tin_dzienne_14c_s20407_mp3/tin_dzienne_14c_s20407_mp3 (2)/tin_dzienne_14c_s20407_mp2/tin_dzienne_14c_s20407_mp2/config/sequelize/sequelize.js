const Sequelize = require("sequelize");

const sequelize = new Sequelize("Tin-dzienne-S20407-mp2", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
