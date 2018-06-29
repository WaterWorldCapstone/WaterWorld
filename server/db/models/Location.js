const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  latitude: {
    type: Sequelize.STRING
  },
  longitude: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.STRING
  },
  poolCount: {
    type: Sequelize.INTEGER
  }
})

module.exports = Location
