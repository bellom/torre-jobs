const express = require('express');
const router = express.Router();
const request = require('../controllers/index');

router.get('/user/:username', request.get_user)
router.post('/jobs', request.get_relevant_job)
router.get('/job/:jobID', request.get_job_details)
router.post('/employees', request.get_employees)

module.exports = router;