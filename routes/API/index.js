const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/users', thoughtRoutes);
router.use('/thoughts', userRoutes);

module.exports = router;
