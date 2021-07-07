const express = require('express');
const router = express.Router();
const request = require('../controllers/index');

router.get('/user/:username', request.get_user)
router.get('/jobs/:username', request.get_relevant_job)
router.get('/job/:jobId', request.get_job_details)
router.get('/employees/:company', request.get_employees)

module.exports = router;