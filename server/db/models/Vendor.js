const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");


//potential fields: moneyOwed; moneyPaid; monthlyDisbursement;
const Vendor = db.define("vendor", {
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: { type: Sequelize.STRING, allowNull: false },
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
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("salt");
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = Vendor;

//from boilermaker
Vendor.prototype.correctPassword = function(candidatePwd) {
  return Donor.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
//from boilermaker
Vendor.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

//from boilermaker
Vendor.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */

 //from boilermaker
const setSaltAndPassword = vendor => {
  if (vendor.changed("password")) {
    vendor.salt = Vendor.generateSalt();
    vendor.password = Vendor.encryptPassword(vendor.password(), vendor.salt());
  }
};

const updateDisbursement = vendor => {
  Number(vendor.totalDisbursement) += Number(vendor.mostRecentDisbursement)
  Number(vendor.disbursementCount) += 1
}

Vendor.beforeCreate(setSaltAndPassword);
Vendor.beforeUpdate(setSaltAndPassword);
//these two from boilermaker ^^

Vendor.afterUpdate(updateDisbursement);
