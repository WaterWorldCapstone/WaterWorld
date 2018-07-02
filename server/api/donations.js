const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Donation, Pool} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const donations = await Donation.findAll()
    res.json(donations)
  })
)

router.get(
  '/pools/:poolId/donors/:donorId',
  asyncHandler(async (req, res) => {
    const donation = await Donation.findOne({
      where: {
        donorId: req.params.donorId,
        poolId: req.params.poolId
      }
    })
    res.json(donation)
  })
)
//req.body expects donorid and poolid to be passed
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const donation = await Donation.create(req.body)
    const pool = await Pool.findById(req.body.poolId)
    await pool.updateFunds(req.body.amount, 'donation')
    res.json(donation)
  })
)

router.put(
  '/pools/:poolId/donors/:donorId',
  asyncHandler(async (req, res) => {
    const [, donation] = await Donation.update(req.body, {
      where: {
        donorId: req.params.donorId,
        poolId: req.params.poolId
      },
      returning: true
    })
    res.json(donation)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await Donation.destroy({
      where: {
        donorId: req.params.donorId,
        poolId: req.params.poolId
      }
    })
    res.send(req.params.id)
  })
)
