const User = require("./user");
const Donor = require("./Donor");
const Pool = require("./Pool");
const Vendor = require("./Vendor");
const Donation = require("./Donation");
const Transaction = require("./Transaction");

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

Donor.belongsToMany(Pool, { through: "donation" });
Pool.belongsToMany(Donor, { through: "donation" });
Vendor.belongsToMany(Pool, { through: "transaction" });
Pool.belongsToMany(Vendor, { through: "transaction" });

module.exports = {
  User,
  Donor,
  Pool,
  Vendor,
  Donation,
  Transaction,
};
