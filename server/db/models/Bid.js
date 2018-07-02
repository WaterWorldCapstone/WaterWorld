const Sequelize = require('sequelize')
const db = require('../db')

const Bid = db.define('bid', {
  amount: Sequelize.INTEGER
})

module.exports = Donation
