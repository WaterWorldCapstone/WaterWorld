const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook App ID / secret not found. Skipping Facebook OAuth.')
} else {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({facebookId: profile.id}, function(err, user) {
          return cb(err, user)
        })
      }
    )
  )

  router.get('/facebook', passport.authenticate('facebook'))

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
