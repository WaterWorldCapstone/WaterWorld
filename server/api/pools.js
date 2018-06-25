const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Pool} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const pools = await Pool.findAll()
    res.json(pools)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const pool = await Pool.findById(req.params.id)
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
