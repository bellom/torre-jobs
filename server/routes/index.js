const express = require('express');
const router = express.Router();
const reqs = require('../controllers/index');

router.get('/user/:username', reqs.get_user)

module.exports = router;