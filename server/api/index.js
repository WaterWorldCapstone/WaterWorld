const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/donors', require('./donors'));
router.use('/vendors', require('./vendors'));
router.use('/pools', require('./pools'));
router.use('/donations', require('./donations'));
router.use('/transactions', require('./transactions'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
