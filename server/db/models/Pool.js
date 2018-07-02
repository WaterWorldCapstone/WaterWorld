const Sequelize = require('sequelize')
const db = require('../db')

const Pool = db.define('pool', {
  name: {type: Sequelize.STRING, allowNull: false},
  latitude: {type: Sequelize.STRING, allowNull: false},
  longitude: {type: Sequelize.STRING, allowNull: false},
  mostRecentDonation: Sequelize.STRING,
  mostRecentExpenditure: Sequelize.STRING,
  targetQuantity: Sequelize.STRING, //represents amount of water in each dispatch to the pool area
  town: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: Sequelize.STRING, //pool is in planning, collecting money, open for bidding, sent to vendor, complete
  currentFunds: Sequelize.STRING,
  solutionType: Sequelize.STRING,
  goalFunds: Sequelize.STRING,
  needIntensity: Sequelize.STRING,
  population: Sequelize.INTEGER,
  mortalityRate: Sequelize.STRING,
  factoids: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  waterQuality: Sequelize.STRING,
  bids: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Pool

//Pool model instance method
Pool.prototype.updateFunds = async function(amount, type) {
  if (type === 'donation') {
    this.currentFunds = Number(amount) + Number(this.currentFunds)
    this.mostRecentDonation = amount
  } else if (type === 'transaction') {
    this.currentFunds = Number(this.currentFunds) - Number(amount)
    this.mostRecentExpenditure = amount //should coerce to string
  }
  await this.save()
}

// remember to properly execute updateFunds in the routes~~~~
