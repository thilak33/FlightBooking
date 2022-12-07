const express = require('express')
const router = express.Router()
const {getAllFlights,bookFlight,bookFlightWithLogin,getparticularFlights} = require('../controllers/myflight')
const fetchuser = require('../middleware/fetchuser')

router.get('/myflights',getAllFlights)
router.get('/auth/myflights',fetchuser,getAllFlights)
router.get('/auth/myflight',fetchuser,getparticularFlights)
router.get('/myflight',getparticularFlights)
router.post('/bookflight',bookFlight)
router.post('/auth/bookflight',fetchuser,bookFlightWithLogin)

module.exports = router