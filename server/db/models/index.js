const User = require('./user')
const Donor = require('./Donor')
const Pool = require('./Pool')
const Vendor = require('./Vendor')
const Donation = require('./Donation')
const Transaction = require('./Transaction')
const Region = require('./Region')

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

Donor.belongsToMany(Pool, {through: 'donation'})
Pool.belongsToMany(Donor, {through: 'donation'})
Vendor.belongsToMany(Pool, {through: 'transaction'})
Pool.belongsToMany(Vendor, {through: 'transaction'})
Vendor.belongsToMany(Pool, {through: 'bid'})
Pool.belongsToMany(Vendor, {through: 'bid'})
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
  Region
}
