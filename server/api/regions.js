const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const {Region} = require('../db/models')
module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const regions = await Region.findAll()
    res.json(regions)
  })
)
