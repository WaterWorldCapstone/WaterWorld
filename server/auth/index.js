const router = require('express').Router()
const User = require('../db/models/user')
const Donor = require('../db/models/Donor')
const Vendor = require('../db/models/Vendor')
module.exports = router

router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'))

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({where: {email: req.body.email}})
  if (!user) {
    console.log('No such user found:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else if (!user.correctPassword(req.body.password)) {
    console.log('Incorrect password for user:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else {
    req.login(user, err => (err ? next(err) : res.json(user)))
  }
})

//route will expect a req.body to state if the user is donor or vendor
//req.body.userType, req.body.user, req.body.type
router.post('/signup', async (req, res, next) => {
  console.log('req.body is', req.body)
  const type = req.body.userType
  try {
    console.log('req.body.user is', req.body.user)
    let user
    if (type === 'donor') {
      user = await User.create({...req.body.user, userType: 'donor'})
      const newDonor = await Donor.create(req.body.type)
      await newDonor.setUser(user)
    } else if (type === 'vendor') {
      user = await User.create({...req.body.user, userType: 'vendor'})
      const newVendor = await Vendor.create({
        ...req.body.type,
        userType: 'vendor'
      })
      await newVendor.setUser(user)
    }
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'))
