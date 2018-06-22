const Sequelize = require('sequelize')
const db = require('../db')

const Donation = db.define('donation', {
  amount: Sequelize.STRING
})

module.exports = Donation
