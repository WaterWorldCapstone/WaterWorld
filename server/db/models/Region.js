const Sequelize = require('sequelize')
const db = require('../db')

const Region = db.define('region', {
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

module.exports = Region
