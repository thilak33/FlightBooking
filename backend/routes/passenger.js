const express = require('express')
const router = express.Router()
const {getPassenger,createPassenger, createPassengerwithuser,getPassofBook} = require('../controllers/passenger')
const fetchuser = require('../middleware/fetchuser')


router.post('/createpassenger',createPassenger)
router.post('/auth/createpassenger',fetchuser,createPassengerwithuser)
router.get('/getpassengers',getPassenger)
router.get('/auth/getpassengers',fetchuser,getPassenger)
router.get('/auth/getpassofbook',fetchuser,getPassofBook)
router.get('/getpassofbook',getPassofBook)

module.exports = router