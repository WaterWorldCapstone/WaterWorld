const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Bid} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const bids = await Bid.findAll()
    res.json(bids)
  })
)

router.get(
  '/pools/:poolId/donors/:donorId',
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
    res.json(bid)
  })
)

router.put(
  '/pools/:poolId/vendors/:vendorId',
  asyncHandler(async (req, res) => {
    const [, bid] = await Bid.update(req.body, {
      where: {
        vendorId: req.params.vendorId,
        poolId: req.params.poolId
      },
      returning: true
    })
    res.json(bid)
  })
)

router.delete(
  '/pools/:poolId/vendors/:vendorId',
  asyncHandler(async (req, res) => {
    await Bid.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send(req.params.id)
  })
)
