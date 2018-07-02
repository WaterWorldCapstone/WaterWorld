const Sequelize = require('sequelize')
const db = require('../db')

//potential fields: moneyOwed; moneyPaid; monthlyDisbursement;
const Vendor = db.define('vendor', {
  address: Sequelize.STRING,
  continent: Sequelize.STRING,
  country: Sequelize.STRING,
  town: Sequelize.STRING,
  maxCapacity: Sequelize.STRING,
  companyName: Sequelize.STRING,
  mostRecentDisbursement: Sequelize.STRING,
  totalWaterDistributed: Sequelize.INTEGER,
  disbursementCount: Sequelize.INTEGER,
  totalDisbursement: Sequelize.STRING,
  averagePrice: Sequelize.STRING,
  bids: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  }
})

module.exports = Vendor

const updateDisbursement = vendor => {
  vendor.totalDisbursement =
    Number(vendor.totalDisbursement) + Number(vendor.mostRecentDisbursement)
  vendor.disbursementCount = Number(vendor.disbursementCount) + 1
}

Vendor.afterUpdate(updateDisbursement)
