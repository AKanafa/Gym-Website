const sequelize = require("./sequelize");

const Client = require("../../model/sequelize/Client");
const Location = require("../../model/sequelize/Location");
const Register = require("../../model/sequelize/Register");

module.exports = () => {
  Client.hasMany(Register, {
    as: "Registers",
    foreignKey: { name: "client_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Register.belongsTo(Client, {
    as: "client",
    foreignKey: { name: "client_id", allowNull: false },
  });
  Location.hasMany(Register, {
    as: "Registers",
    foreignKey: { name: "location_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Register.belongsTo(Location, {
    as: "location",
    foreignKey: { name: "location_id", allowNull: false },
  });

  let allClient, allLoc;
  return sequelize
    .sync({ force: true })
    .then(() => {
      return Client.findAll();
    })
    .then((cli) => {
      if (!cli || cli.length == 0) {
        return Client.bulkCreate([
          { name: "Adam Kanafa", pesel: 98091985441, zaszczepiony: "Tak" },
          { name: "Janusz Kowalski", pesel: 12345678901, zaszczepiony: "Nie" },
        ]).then(() => {
          return Client.findAll();
        });
      } else {
        return cli;
      }
    })
    .then((cli) => {
      allClient = cli;
      return Location.findAll();
    })
    .then((loc) => {
      if (!loc || loc.length == 0) {
        return Location.bulkCreate([
          { nazwa: "Mazowiecka 23", iloscTrenerow: 10, iloscMaszyn: 23 },
          { nazwa: "Polna 54", iloscTrenerow: 3, iloscMaszyn: 12 },
        ]).then(() => {
          return Client.findAll();
        });
      } else {
        return loc;
      }
    })
    .then((loc) => {
      allLoc = loc;
      return Register.findAll();
    })
    .then((reg) => {
      if (!reg || reg.length == 0) {
        return Register.bulkCreate([
          {
            client_id: allClient[0]._id,
            location_id: allLoc[0]._id,
            oplacony: false,
            data1: "10/12/2021",
            numerKarnetu: 111,
            
          },
          {
            client_id: allClient[1]._id,
            location_id: allLoc[1]._id,
            oplacony: true,
            data1: "10/10/2021",
            numerKarnetu: 222,
            
          },
        ]);
      } else {
        return reg;
      }
    });
};
