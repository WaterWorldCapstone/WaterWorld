// const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  cost: Sequelize.STRING,
  quantity: Sequelize.STRING,
  deliveryDate: Sequelize.DATE,
});

module.exports = Transaction;
