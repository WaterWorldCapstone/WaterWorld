/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'cody@puppybook.com',
          lastName: 'codybook',
          email: 'cody@pupperkins.fsa',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
  describe('required fields', () => {
    beforeEach(() => db.sync({force: true}))
    let reqVarObj = {
      email: 'testy@mctester.son',
      firstName: 'dihydro',
      lastName: 'carbon',
      password: 'monoxide'
    }
    it('has a firstName column, which cannot be null', async () => {
      let testVal
      try {
        await User.create({...reqVarObj, firstName: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
    })
    it('has its firstName column functioning properly', async () => {
      const newUser = await User.create(reqVarObj)
      expect(newUser.firstName).to.equal('dihydro')
    })
    it('has a lastName column, which cannot be null', async () => {
      let testVal
      try {
        await User.create({...reqVarObj, lastName: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
    })
    it('has its lastName column functioning properly', async () => {
      const newUser = await User.create(reqVarObj)
      expect(newUser.lastName).to.equal('carbon')
    })
    it('has an email column, which cannot be null', async () => {
      let testVal
      try {
        await User.create({...reqVarObj, email: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
    })
    it('has its email column functioning properly', async () => {
      const newUser = await User.create(reqVarObj)
      expect(newUser.email).to.equal('testy@mctester.son')
    })
    it('has a password column, which cannot be null', async () => {
      let testVal
      try {
        await User.create({...reqVarObj, password: null})
        testVal = false
      } catch (e) {
        testVal = true
      }
      expect(testVal).to.be.true
    })
  })
}) // end describe('User model')
