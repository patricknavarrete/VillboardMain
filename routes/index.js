const express = require('express')
const actions = require('../methods/actions')
const user = require('../models/user')
const suggestion = require ('../models/suggestion')
const visitor = require ('../models/visitor')
const payment = require ('../models/payment')
const upload = require('../middleware/upload')
const pet = require ('../models/pet')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)

router.post('/addSuggestion', actions.addNewSuggestion)

router.post('/addVisitor', actions.addNewVisitor)

router.post('/addPayment', upload.single('proofPayment'), actions.addPayment)

router.post ('/addPet', actions.addPet)




//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

router.post('/postUserinfo', actions.postUserinfo)

router.post('/postSuggestion', actions.postSuggestions)

router.post('/postVisitor', actions.postVisitors)

router.post('/deleteDataUser', actions.deleteDataUser)

router.get('/checkEmail/:email', actions.checkEmail)

router.post('/changepass', actions.changepass)

router.post('/changeFirstname', actions.changeFirstname)

router.post('/changeLastname', actions.changeLastname)

router.post('/changeMiddleinitial', actions.changeMiddleinitial)

router.post('/changeAddress', actions.changeAddress)

router.post('/changePhonenumber', actions.changePhonenumber)





module.exports = router