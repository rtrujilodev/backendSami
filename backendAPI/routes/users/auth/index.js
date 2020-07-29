'use strict'

const router = require('express').Router();
const authController = require('../../../controllers/users/auth'); 

router.post('/authenticate', authController.authenticate);
router.post('/register', authController.create);

module.exports = router;
