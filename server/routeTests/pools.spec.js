const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Pool = db.model('pool')
import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
const pg = require('pg')
delete pg.native
chai.use(chaiProperties)
chai.use(chaiThings)

describe('Pool routes', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('pools routes', async () => {
    const reqVarObj = {
      name: 'poolName',
      latitude: '55',
      longitude: '55',
      town: 'hellofa',
      country: 'none, for old men',
      continent: 'Tethys Island'
    }
    beforeEach(async () => {
      await Pool.create(reqVarObj)
    })
    it('gets a 200-OK response', async () => {
      const res = await request(app).get('/api/pools')
      expect(res.status).to.equal(200)
    })
    it('retrieves a proper and correct name for a created pool', async () => {
      const res = await request(app).get('/api/pools')
      expect(res.body[0].name).to.equal('poolName')
    })
    it('serves up all pools on a GET to "/"', async () => {
      const res = await request(app).get('/api/pools')
      expect(res.body.length).to.equal(1)
    })
    it('the GET to "/" route is safe', async () => {
      const allPools = await Pool.findAll()
      const res = await request(app).get('/api/pools')
      expect(res.body[0].longitude).to.equal(allPools[0].longitude)
    })
    it('the GET route to "/" is idempotent', async () => {
      let res = await request(app).get('/api/pools')
      const resOne = res.body.slice()
      res = await request(app).get('/api/pools')
      const resTwo = res.body.slice()
      res = await request(app).get('/api/pools')
      expect(res.body[0].name).to.equal(resOne[0].name)
      expect(res.body[0].continent).to.equal(resTwo[0].continent)
      expect(resOne[0].continent).to.equal(resTwo[0].continent)
    })
    it('serves down a single pool on GET to "/:id"', async () => {
      const onePool = await Pool.findById(1)
      const res = await request(app).get('/api/pools/1')
      expect(res.body.country).to.equal(onePool.country)
    })
    it('the GET route to "/:id" is safe', async () => {
      const onePool = await Pool.findById(1)
      await request(app).get('/api/pools/1')
      const res = await request(app).get('/api/pools/1')
      expect(res.body.town).to.equal(onePool.town)
    })

    it('the GET route to "/:id" is idempotent (not impotent...shush)', async () => {
      const onePool = await Pool.findById(1)
      await request(app).get('/api/pools/1')
      await request(app).get('/api/pools/1')
      await request(app).get('/api/pools/1')
      const resOne = await request(app).get('/api/pools/1')
      await request(app).get('/api/pools/1')
      await request(app).get('/api/pools/1')
      const res = await request(app).get('/api/pools/1')
      expect(res.body.latitude).to.equal(onePool.latitude)
      expect(res.body.latitude).to.equal(resOne.body.latitude)
    })

    it('lets you post a thing', async () => {
      await db.sync({force: true})
      const res = await request(app)
        .post('/api/pools')
        .send(reqVarObj)
      expect(res.body.name).to.equal('poolName')
      const {body} = await request(app).get('/api/pools')
      expect(body.length).to.equal(1)
    })

    it('lets you put a thing with a returning put route', async () => {
      await db.sync({force: true})
      const newPool = await Pool.create(reqVarObj)
      const res = await request(app)
        .put(`/api/pools/${newPool.id}`)
        .send({currentFunds: '9999'})
      expect(res.status).to.equal(200)
      expect(res.body[0].name).to.equal('poolName')
      expect(res.body[0].currentFunds).to.equal(`9999`)
    })
    it('lets you delete a thing with a delete route', async () => {
      await request(app).delete('/api/pools/1')
      const res = await request(app).get('/api/pools')
      expect(res.status).to.equal(200)
    })
  })
})
