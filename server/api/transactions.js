const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Transaction, Pool} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const transactions = await Transaction.findAll({
      include: [{all: true, nested: true}]
    })
    res.json(transactions)
  })
)

router.get(
  '/:transactionId',
  asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.transactionId, {
      include: [{all: true, nested: true}]
    })
    res.json(transaction)
  })
)
//req.body expects vendorId and poolid to be passed
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const transaction = await Transaction.create(req.body)
    res.json(transaction)
  })
)

router.put(
  '/pools/:poolId/vendors/:vendorId',
  asyncHandler(async (req, res) => {
    const [, transaction] = await Transaction.update(req.body, {
      where: {
        vendorId: req.params.vendorId,
        poolId: req.params.poolId
      },
      returning: true
    })
    res.json(transaction)
  })
)

router.delete(
  '/:/pools/:poolId/vendors/:vendorId',
  asyncHandler(async (req, res) => {
    await Transaction.destroy({
      where: {
        vendorId: req.params.vendorId,
        poolId: req.params.poolId
      }
    })
    res.send(req.params.id)
  })
)
