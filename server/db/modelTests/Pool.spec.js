const {expect} = require('chai')
const db = require('../index')
const Transaction = db.model('transaction')
const User = db.model('user')
const Vendor = db.model('vendor')
const Pool = db.model('pool')
const {users, vendors, pools} = require('../../../script/seed.js')

describe('The Pool model', async () => {
  let reqVarObj = {
    name: 'Ace Ventura',
    latitude: 55,
    longitude: 55,
    town: 'Skipland',
    country: 'Trumpland',
    continent: "'murrica"
  }
  before(() => {
    return db.sync({force: true})
  })
  describe('required columns', async () => {
    it('has a name column, which cannot be null', async () => {
      let testVal
      try {
        await Pool.create({...reqVarObj, name: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
      const newPool = await Pool.create(reqVarObj)
      expect(newPool.name).to.equal('Ace Ventura')
    })

    it('has a latitude column, which cannot be null', async () => {
      let testVal
      try {
        await Pool.create({...reqVarObj, latitude: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
      const newPool = await Pool.create(reqVarObj)
      expect(newPool.latitude).to.equal('55')
    })
    it('has a longitude column, which cannot be null', async () => {
      let testVal
      try {
        await Pool.create({...reqVarObj, longitude: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
      const newPool = await Pool.create(reqVarObj)
      expect(newPool.longitude).to.equal('55')
    })
    it('has a town column, which cannot be null', async () => {
      let testVal
      try {
        await Pool.create({...reqVarObj, town: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
      const newPool = await Pool.create(reqVarObj)
      expect(newPool.town).to.equal('Skipland')
    })
    it('has a country column, which cannot be null', async () => {
      let testVal
      try {
        await Pool.create({...reqVarObj, country: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
      const newPool = await Pool.create(reqVarObj)
      expect(newPool.country).to.equal('Trumpland')
    })
    it('has a continent column, which cannot be null', async () => {
      let testVal
      try {
        await Pool.create({...reqVarObj, continent: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
      const newPool = await Pool.create(reqVarObj)
      expect(newPool.continent).to.equal("'murrica")
    })
  })

  let allVarObj = {
    ...reqVarObj,
    mostRecentDonation: '100',
    mostRecentExpenditure: '200',
    targetQuantity: '987654321',
    status: 'collecting',
    currentFunds: '100',
    solutionType: 'water',
    needIntensity: 'red',
    population: '1234567890',
    mortalityRate: '101 per 10000',
    factoids: [
      'Sequelize uses SQL',
      'The Fundamental Theorem of Arithmetic is strangely unrelated to my concept of arithmetic'
    ],
    waterQuality: 'Poop'
  }
  describe('other columns', async () => {
    it('has a mostRecentDonation column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          mostRecentDonation: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.mostRecentDonation).to.equal(null)
      const updatedPool = await newPool.update({mostRecentDonation: '1337'})
      expect(updatedPool.mostRecentDonation).to.equal('1337')
    })
    it('has a mostRecentExpenditure column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          mostRecentExpenditure: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.mostRecentExpenditure).to.equal(null)
      const updatedPool = await newPool.update({
        mostRecentExpenditure: '1337'
      })
      expect(updatedPool.mostRecentExpenditure).to.equal('1337')
    })
    it('has a targetQuantity column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          targetQuantity: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.targetQuantity).to.equal(null)
      const updatedPool = await newPool.update({targetQuantity: '9999'})
      expect(updatedPool.targetQuantity).to.equal('9999')
    })
    it('has a status column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          status: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.status).to.equal(null)
      const updatedPool = await newPool.update({status: 'elite'})
      expect(updatedPool.status).to.equal('elite')
    })
    it('has a currentFunds column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          currentFunds: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.currentFunds).to.equal(null)
      const updatedPool = await newPool.update({currentFunds: '8001'})
      expect(updatedPool.currentFunds).to.equal('8001')
    })
    it('has a solutionType column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          solutionType: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.solutionType).to.equal(null)
      const updatedPool = await newPool.update({solutionType: 'boaring'})
      expect(updatedPool.solutionType).to.equal('boaring')
    })
    it('has a goalFunds column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          goalFunds: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.goalFunds).to.equal(null)
      const updatedPool = await newPool.update({goalFunds: '9001'})
      expect(updatedPool.goalFunds).to.equal('9001')
    })
    it('has a mortalityRate column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          mortalityRate: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.mortalityRate).to.equal(null)
      const updatedPool = await newPool.update({mortalityRate: '900 per 10000'})
      expect(updatedPool.mortalityRate).to.equal('900 per 10000')
    })

    it('has a factoids column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          factoids: null
        })
      } catch (e) {
        console.log(e)
      }
      expect(newPool.factoids).to.equal(null)
      const updatedPool = await newPool.update({
        factoids: [
          "I'm more sorry than I can communicate",
          'I always thoroughly appreciated candor'
        ]
      })
      expect(updatedPool.factoids.length).to.equal(2)
      expect(updatedPool.factoids[0]).to.equal(
        "I'm more sorry than I can communicate"
      )
      expect(updatedPool.factoids[1]).to.equal(
        'I always thoroughly appreciated candor'
      )
    })
    it('has a waterQuality column, which can be null', async () => {
      let newPool
      try {
        newPool = await Pool.create({
          ...allVarObj,
          waterQuality: null
        })
        expect(newPool.waterQuality).to.equal(null)
        const updatedPool = await newPool.update({waterQuality: 'pewp'})
        expect(updatedPool.waterQuality).to.equal('pewp')
      } catch (e) {
        console.log(e)
      }
    })
  })
  describe('Pool model instance method', async () => {
    before(() => {
      return db.sync({force: true})
    })
    it('has an updateFunds instance method', async () => {
      const newPool = await Pool.create(reqVarObj)
      expect(typeof newPool.updateFunds).to.equal('function')
    })

    it('has its instance method not on the model', () => {
      expect(Pool.hasOwnProperty('updateFunds')).to.be.false
    })

    it('is not an arrow function', async () => {
      const testPool = await Pool.create(reqVarObj)
      let testVar
      try {
        await testPool.updateFunds('200', 'donation')
        testVar = true
      } catch (err) {
        console.log(err)
      }
      expect(testVar).to.equal(true)
    })

    it('functions properly for donations and transactions', async () => {
      try {
        const newPoolDonation = await Pool.create({
          ...reqVarObj,
          name: 'updateFundsDonationTest',
          currentFunds: 0
        })
        await newPoolDonation.updateFunds.call(
          newPoolDonation,
          '100',
          'donation'
        )
        const updatedPoolDonation = await Pool.findOne({
          where: {name: 'updateFundsDonationTest'}
        })
        expect(updatedPoolDonation.currentFunds).to.equal('100')
        expect(updatedPoolDonation.mostRecentDonation).to.equal('100')
        const newPoolTransaction = await Pool.create({
          ...reqVarObj,
          name: 'updateFundsTransactionTest',
          currentFunds: '500'
        })
        await newPoolTransaction.updateFunds.call(
          newPoolTransaction,
          '100',
          'transaction'
        )
        const updatedPoolTransaction = await Pool.findOne({
          where: {name: 'updateFundsTransactionTest'}
        })
        expect(updatedPoolTransaction.currentFunds).to.equal('400')
        expect(updatedPoolTransaction.mostRecentExpenditure).to.equal('100')
      } catch (e) {
        console.log(e)
      }
    })
  })
})
