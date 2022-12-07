const express = require('express')
const router = express.Router()
const {allflights, createFlight} = require('../controllers/flight')


router.get('/flights',allflights)
router.post('/flights',createFlight)

module.exports = router