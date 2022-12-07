const express = require('express')
const router = express.Router()
const {createPdf,getPdf} = require('../controllers/pdf')


router.post('/createpdf',createPdf)
router.get('/getpdf',getPdf)

module.exports = router