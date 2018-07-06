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
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      'http://www.rainharvest.co.za/wp-content/uploads/2010/05/water-scarcity.jpg',
      'https://images.indianexpress.com/2015/06/water-crisis.jpg',
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg'
    ]
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
