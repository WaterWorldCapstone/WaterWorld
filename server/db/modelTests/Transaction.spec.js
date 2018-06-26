/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Transaction = db.model('transaction')
const User = db.model('user')
const Vendor = db.model('vendor')
const Pool = db.model('pool')
const {users, vendors, pools} = require('../../../script/seed.js')

describe('Transaction model', () => {
  before(() => {
    return db.sync({force: true})
  })
  describe('the transaction model', async () => {
    it('is a join table, not to be created directly', async () => {
      let testVal
      try {
        const newTransaction = await Transaction.create({
          vendorId: 1,
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
      const createdVendors = await Promise.all(
        vendors.map(vendor => Vendor.create(vendor))
      )
      const createdPools = await Promise.all(
        pools.map(pool => Pool.create(pool))
      )
      await createdUsers[0].setVendor(createdVendors[0])
      await createdUsers[0].setVendor(createdVendors[0])
      await createdPools[0].addVendor(createdVendors[0])
      const foundTransactions = await Transaction.findAll()
      expect(foundTransactions.length).to.equal(1)
      expect(foundTransactions[0].id).to.equal(undefined)
    })

    it('correctly associates the new transaction to a vendor', async () => {
      const foundTransactions = await Transaction.findAll()
      expect(foundTransactions.length).to.equal(1)
      expect(foundTransactions[0].vendorId).to.equal(1)
    })

    it('correctly associates the new transaction to a pool', async () => {
      const foundTransactions = await Transaction.findAll()
      expect(foundTransactions.length).to.equal(1)
      expect(foundTransactions[0].poolId).to.equal(1)
    })

    it("correctly associates both id's to the transaction", async () => {
      const foundTransactions = await Transaction.findAll()
      expect(foundTransactions.length).to.equal(1)
      expect(foundTransactions[0].poolId).to.equal(1)
      expect(foundTransactions[0].vendorId).to.equal(1)
    })
  })
})
