'use strict'

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.post('/',controller.create);
router.post('/authenticate',controller.authenticate);
router.post('/refresh-token',authService.authorize ,controller.refreshToken);

module.exports = router;