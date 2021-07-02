const express = require('express');
const router = express.Router();
const request = require('../controllers/index');

router.get('/user/:username', request.get_user)

module.exports = router;