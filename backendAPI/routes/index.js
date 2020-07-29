'use strict';

const router = require('express').Router();

router.get('/',require('../controllers/docs'));
router.use('/auth',require('./users/auth'));
router.use('/cad',require('./users/cad'));

module.exports = router;
