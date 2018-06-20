const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const Pool = db.define("pool", {
  name: { type: Sequelize.STRING, allowNull: false },
  latitude: { type: Sequelize.STRING, allowNull: false },
  longitude: { type: Sequelize.STRING, allowNull: false },
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

const updateFunds = (pool, donation) => {
  // Number(pool.currentFunds) += Number(donation.amountorwhatever);
};

Pool.afterUpdate(updateFunds);
