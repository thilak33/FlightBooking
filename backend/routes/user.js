const express = require('express')
const router = express.Router()
const {getUser, getUsers, createUser , authUser} = require('../controllers/user')
const fetchuser = require('../middleware/fetchuser')

router.get('/auth',getUsers)
router.post('/auth',createUser)
router.post('/auth/login',authUser)
router.post('/auth/getuser',fetchuser,getUser)

module.exports = router


