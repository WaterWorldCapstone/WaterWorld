const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Transaction, Pool} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const transactions = await Transaction.findAll()
    res.json(transactions)
  })
)

router.get(
  '/pools/:poolId/vendors/:vendorId',
  asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({
      where: {
        vendorId: req.params.vendorId,
        poolId: req.params.poolId
      }
    })
    res.json(transaction)
  })
)
//req.body expects vendorId and poolid to be passed
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const transaction = await Transaction.create(req.body)
    const pool = await Pool.findById(req.body.poolId)
    await pool.updateFunds(req.body.amount, 'transaction')
    res.json(transaction)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const [, transaction] = await Transaction.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(transaction)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await Transaction.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send(req.params.id)
  })
)
