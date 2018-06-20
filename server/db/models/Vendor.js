const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

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
  maxCapacity: Sequelize.DECIMAL,
  companyName: Sequelize.STRING,
  totalWaterDistributed: Sequelize.INTEGER,
  averagePrice: Sequelize.DECIMAL,
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

Vendor.prototype.correctPassword = function(candidatePwd) {
  return Donor.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Vendor.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

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

const calculateTotal = (vendor, transaction) => {
  //add transaction amount to the vendor field
};
const setSaltAndPassword = vendor => {
  if (vendor.changed("password")) {
    vendor.salt = Donor.generateSalt();
    vendor.password = Donor.encryptPassword(vendor.password(), vendor.salt());
  }
};

Vendor.beforeCreate(setSaltAndPassword);
Vendor.beforeUpdate(setSaltAndPassword);
// Vendor.afterCreate
// Vendor.afterUpdate
