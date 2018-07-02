const router = require('express').Router()
const asyncHandler = require('express-async-handler')
module.exports = router

const axios = require('axios')

const scriptContents = axios
  .get('https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1')
  .then(res => res.data)

scriptContents.then(script => console.log('SCRIPT?', script.slice(0)))

router.get(
  '/IATS',
  asyncHandler(async (req, res) => {
    res.set('Content-Type', 'text/javascript').end(await scriptContents)
  })
)
