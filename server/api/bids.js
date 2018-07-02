const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Bid, Pool} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const bids = await Bid.findAll()
    res.json(bids)
  })
)

router.get(
  '/:poolId/:donorId',
  asyncHandler(async (req, res) => {
    const bid = await Bid.findOne({
      where: {
        donorId: req.params.donorId,
        poolId: req.params.poolId
      }
    })
    res.json(bid)
  })
)
//req.body expects donorid and poolid to be passed
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const bid = await Bid.create(req.body)
    const pool = await Pool.findById(req.body.poolId)
    await pool.updateFunds(req.body.amount, 'bid')
    res.json(bid)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const [, bid] = await Bid.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(bid)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await Bid.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send(req.params.id)
  })
)
