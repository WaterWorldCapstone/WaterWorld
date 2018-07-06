const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Pool} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const pools = await Pool.findAll({
      include: [{all: true, nested: true}]
    })
    res.json(pools)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const pool = await Pool.findById(req.params.id, {
      include: [{all: true, nested: true}]
    })
    res.json(pool)
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const pool = await Pool.create(req.body)
    res.json(pool)
  })
)

router.post(
  '/input',
  asyncHandler(async (req, res) => {
    console.log('in the input route', req.body)
    const newPool = await Pool.create(req.body)
    res.json(newPool)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const [, pool] = await Pool.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(pool)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await Pool.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send(req.params.id)
  })
)
