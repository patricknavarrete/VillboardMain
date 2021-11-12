const express = require('express')
const actions = require('../methods/actions')
const user = require('../models/user')
const suggestion = require ('../models/suggestion')
const visitor = require ('../models/visitor')
const payment = require ('../models/payment')
const upload = require('../middleware/upload')
const pet = require ('../models/pet')
const car = require ('../models/pet')
const post = require ('../models/post')
const router = express.Router()





router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', upload.single('profilePicture'),actions.addNew)

router.post('/addSuggestion', actions.addNewSuggestion)

router.post('/addVisitor', actions.addNewVisitor)

router.post('/addPayment', upload.single('proofPayment'), actions.addPayment)

router.post ('/addPet',  actions.addPet)

router.post ('/addCar', actions.addCar)

router.post ('/addFamily', actions.addFamily)

router.post ('/addPost',upload.single('postPicture'),actions.addPost)

router.post('/addReservation',actions.addReservation )



//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

router.post('/postUserinfo', actions.postUserinfo)

router.post('/postFamily', actions.postFamily)

router.post('/postReservation', actions.postReservation)

router.post('/postAnnouncement', actions.postAnnouncement)

router.post('/postPet', actions.postPet)

router.post('/postCar', actions.postCar)

router.post('/postSuggestion', actions.postSuggestions)

router.post('/postVisitor', actions.postVisitors)


router.post('/postPayment', actions.postPayment)

router.post('/deleteDataUser', actions.deleteDataUser)

router.get('/checkEmail/:email', actions.checkEmail)

router.get('/user/pet',function (req, res, next){
    petCollections.aggregate
})

router.post('/changepass', actions.changepass)

router.post('/changeFirstname', actions.changeFirstname)

router.post('/changeLastname', actions.changeLastname)

router.post('/changeMiddleinitial', actions.changeMiddleinitial)

router.post('/changeAddress', actions.changeAddress)

router.post('/changePhonenumber', actions.changePhonenumber)





module.exports = router