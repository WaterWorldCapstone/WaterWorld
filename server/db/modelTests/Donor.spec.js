const {expect} = require('chai')
const db = require('../index')
const Donation = db.model('donation')
const User = db.model('user')
const Donor = db.model('donor')
const Pool = db.model('pool')
const {users, vendors, pools} = require('../../../script/seed.js')

xdescribe('Donor model', () => {
  before(() => {
    return db.sync({force: true})
  })
})
