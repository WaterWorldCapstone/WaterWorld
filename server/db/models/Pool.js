const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const Pool = db.define("pool", {
  name: { type: Sequelize.STRING, allowNull: false },
  latitude: { type: Sequelize.STRING, allowNull: false },
  longitude: { type: Sequelize.STRING, allowNull: false },
  mostRecentDonation: Sequelize.STRING,
  mostRecentExpenditure: Sequelize.STRING,
  targetQuantity: Sequelize.STRING, //represents amount of water in each dispatch to the pool area
  town: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  currentFunds: Sequelize.STRING,
  solutionType: Sequelize.STRING,
  goalFunds: Sequelize.STRING,
  needIntensity: Sequelize.STRING,
  population: Sequelize.INTEGER,
  mortalityRate: Sequelize.STRING,
  factoids: Sequelize.ARRAY(Sequelize.STRING),
  waterQuality: Sequelize.STRING,
});

module.exports = Pool;

//Pool model instance method(s)
Pool.prototype.updateFunds = (amount, type) => {
  if (type === "donation") {
    this.currentFunds = Number(amount) + Number(this.currentFunds);
    this.mostRecentDonation = amount;
  } else if (type === "transaction") {
    this.currentFunds = Number(this.currentFunds) - Number(amount);
    this.mostRecentExpenditure = amount; //should coerce to string
  }
};

// remember to properly execute updateFunds in the routes~~~~
