const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const Donor = db.define("donor", {
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: { type: Sequelize.STRING, allowNull: false },
  address: Sequelize.STRING,
  totalDonation: Sequelize.DECIMAL,
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

module.exports = Donor;

/**
 * instanceMethods
 */
Donor.prototype.correctPassword = function(candidatePwd) {
  return Donor.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Donor.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

Donor.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */
const setSaltAndPassword = donor => {
  if (donor.changed("password")) {
    donor.salt = Donor.generateSalt();
    donor.password = Donor.encryptPassword(donor.password(), donor.salt());
  }
};

Donor.beforeCreate(setSaltAndPassword);
Donor.beforeUpdate(setSaltAndPassword);
