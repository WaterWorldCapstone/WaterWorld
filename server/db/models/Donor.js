const Sequelize = require('sequelize')
const db = require('../db')

const Donor = db.define('donor', {
  address: Sequelize.STRING,
  totalDonation: Sequelize.STRING,
  donationCount: Sequelize.INTEGER,
  mostRecentDonation: Sequelize.STRING
})

module.exports = Donor

const updateDonation = donor => {
  donor.totalDonation =
    Number(donor.totalDonation) + Number(donor.mostRecentDonation)
  donor.donationCount = Number(donor.donationCount) + 1
}

Donor.afterUpdate(updateDonation)
