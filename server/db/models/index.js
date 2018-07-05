const User = require('./user')
const Donor = require('./Donor')
const Pool = require('./Pool')
const Vendor = require('./Vendor')
const Donation = require('./Donation')
const Transaction = require('./Transaction')
const Region = require('./Region')
const Bid = require('./Bid')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Donation.belongsToMany(Pool, {through: 'donation_pool', foreignKey: 'poolId'})
// Donation.belongsToMany(Donor, {
//   through: 'donation_donor',
//   foreignKey: 'donorId'
// })
// Pool.belongsToMany(Donation, {
//   through: 'donation_pool',
//   foreignKey: 'donationId'
// })
// Donor.belongsToMany(Donation, {
//   through: 'donation_donor',
//   foreignKey: 'donationId'
// })
Donation.belongsTo(Pool)
Donation.belongsTo(Donor)
Pool.hasMany(Donation)
Donor.hasMany(Donation)
// Transaction.belongsToMany(Pool, {
//   through: 'transaction_pool',
//   foreignKey: 'poolId'
// })
// Transaction.belongsToMany(Vendor, {
//   through: 'transaction_vendor',
//   foreignKey: 'vendorId'
// })
// Pool.belongsToMany(Transaction, {
//   through: 'transaction_pool',
//   foreignKey: 'transactionId'
// })
// Vendor.belongsToMany(Transaction, {
//   through: 'transaction_vendor',
//   foreignKey: 'transactionId'
// })
Transaction.belongsTo(Pool)
Transaction.belongsTo(Vendor)
Pool.hasMany(Transaction)
Vendor.hasMany(Transaction)
Vendor.belongsToMany(Pool, {through: Bid, as: 'Bid', foreignKey: 'vendorId'})
Pool.belongsToMany(Vendor, {through: Bid, as: 'Bid', foreignKey: 'poolId'})
User.hasOne(Donor)
Donor.belongsTo(User)
User.hasOne(Vendor)
Vendor.belongsTo(User)
Region.hasMany(Pool)
Pool.belongsTo(Region)

module.exports = {
  User,
  Donor,
  Pool,
  Vendor,
  Donation,
  Transaction,
  Region,
  Bid
}
