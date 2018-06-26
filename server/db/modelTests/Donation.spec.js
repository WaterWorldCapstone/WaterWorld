/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Donation = db.model('donation')
const User = db.model('user')
const Donor = db.model('donor')
const Pool = db.model('pool')
const {users, vendors, pools} = require('../../../script/seed.js')

describe('Donation model', () => {
  before(() => {
    return db.sync({force: true})
  })
  describe('the donation model', async () => {
    it('is a join table, not to be created directly', async () => {
      let testVal
      try {
        const newDonation = await Donation.create({
          donorId: 1,
          poolId: 1,
          amount: 100
        })
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.equal(true)
    })

    it('is a join table, its rows created via associations', async () => {
      const createdUsers = await Promise.all(
        users.map(user => User.create(user))
      )
      const createdDonors = await Promise.all(
        vendors.map(donor => Donor.create(donor))
      )
      const createdPools = await Promise.all(
        pools.map(pool => Pool.create(pool))
      )
      await createdUsers[0].setDonor(createdDonors[0])
      await createdUsers[0].setDonor(createdDonors[0])
      await createdPools[0].addDonor(createdDonors[0])
      const foundDonations = await Donation.findAll()
      expect(foundDonations.length).to.equal(1)
      expect(foundDonations[0].id).to.equal(undefined)
    })

    it('correctly associates the new donation to a donor', async () => {
      const foundDonations = await Donation.findAll()
      expect(foundDonations.length).to.equal(1)
      expect(foundDonations[0].donorId).to.equal(1)
    })

    it('correctly associates the new donation to a pool', async () => {
      const foundDonations = await Donation.findAll()
      expect(foundDonations.length).to.equal(1)
      expect(foundDonations[0].poolId).to.equal(1)
    })

    it("correctly associates both id's to the donation", async () => {
      const foundDonations = await Donation.findAll()
      expect(foundDonations.length).to.equal(1)
      expect(foundDonations[0].poolId).to.equal(1)
      expect(foundDonations[0].donorId).to.equal(1)
    })
  })
})
