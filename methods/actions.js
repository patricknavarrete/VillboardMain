var User = require('../models/user')
var Suggestion = require ('../models/suggestion')
var Visitor = require ('../models/visitor')
var Payment = require ('../models/payment')
var Upload = require ('../middleware/upload')
var Pet = require ('../models/pet')
var Car = require ('../models/car')
var Post = require ('../models/post')
var Reservation = require ('../models/reservation')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const cors = require('cors')
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')

const express = require('express')

const app = express()

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept","Access-Control-Allow-Credentials","Access-Control-Expose-Headers","Access-Control-Max-Age","Access-Control-Allow-Methods","Access-Control-Request-Method","Access-Control-Request-Headers","OPTIONS");
  next();
})
app.use(cors());


var functions = {
    addNew: function (req, res) {
        if ((!req.body.email) ||  
        (!req.body.firstName) || 
        (!req.body.lastName) || 
        (!req.body.middleInitial) || 
        (!req.body.address) || 
        (!req.body.phoneNumber) ||
        (!req.body.password )
        
        ) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            var newUser = User({
                photoUrlProfile: req.file.location,
                profilePicture: req.body.profilePicture,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleInitial: req.body.middleInitial,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                role: req.body.role,
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },


    addPet: async function async (req,res){
        if ((!req.body.pFirstName) ||
        (!req.body.pLastName) ||
        (!req.body.pAddress) ||
        (!req.body.pPhoneNumber)||
        (!req.body.petName)||
        (!req.body.petBreed)
         )
        {
            res.json ({success: false, msg: 'please enter your report'})
        } 
        else {
            var newPet = Pet({
                pFirstName: req.body.pFirstName,
                pLastName : req.body.pLastName,
                pAddress : req.body.pAddress,
                pPhoneNumber : req.body.pPhoneNumber,
                petName: req.body.petName,
                petBreed: req.body.petBreed,
                email: req.body.email,
            });

            newPet.save()

        const userPet = await User.findOneAndUpdate(

            { email: req.body.email }, 
            {
            $push: {
            petField: {
            pFirstName: req.body.pFirstName,
            pLastName: req.body.pLastName,
            pAddress: req.body.pAddress,
            pPhoneNumber: req.body.pPhoneNumber,
            petName: req.body.petName,
            petBreed: req.body.petBreed,
            email: req.body.email,
            },
            },
            }
            );

            console.log(userPet),

            userPet.save(function(err,userPet){
                if (err){
                    res.json({success: false, msg: 'Failed to save Pet'})
                }
                else {
                    res.json({success: true, msg: 'Successfully AddedPet'})
                }
            })

        }
        
    },


    addCar: async function async (req,res){
        if ((!req.body.cFirstName) ||
        (!req.body.cLastName) ||
        (!req.body.cAddress) ||
        (!req.body.cPhoneNumber)||
        (!req.body.vehicleModel)||
        (!req.body.plateNumber)
         )
        {
            res.json ({success: false, msg: 'please enter your report'})
        } 
        else {
            var newCar = Car({
                cFirstName: req.body.cFirstName,
                cLastName : req.body.cLastName,
                cAddress : req.body.cAddress,
                cPhoneNumber : req.body.cPhoneNumber,
                vehicleModel: req.body.vehicleModel,
                plateNumber: req.body.plateNumber,
                email: req.body.email,
            });

            newCar.save()

            const userCar = await User.findOneAndUpdate(

                { email: req.body.email }, 

                {
                $push: {
                carField: {
                cFirstName: req.body.cFirstName,
                cLastName : req.body.cLastName,
                cAddress : req.body.cAddress,
                cPhoneNumber : req.body.cPhoneNumber,
                vehicleModel: req.body.vehicleModel,
                plateNumber: req.body.plateNumber,
                email: req.body.email,
                },
                },
                }
                );

            userCar.save(function(err,userCar){
                if (err){
                    res.json({success: false, msg: 'Failed to save Car'})
                }
                else {
                    res.json({success: true, msg: 'Successfully AddedCar'})
                }
            })

        }

        
    },

        




    addPayment: async function (req, res) {
        if ((!req.body.uFirstName) || 
        (!req.body.uLastName) ||  
        (!req.body.uAddress) || 
        (!req.body.uPhoneNumber ) ||
        (!req.body.refNumber) ||
        (!req.body.typeTransaction)
        
        ) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            var newPayment = Payment({
                uFirstName: req.body.uFirstName,
                uLastName: req.body.uLastName,
                uAddress: req.body.uAddress,
                uPhoneNumber: req.body.uPhoneNumber,
                refNumber: req.body.refNumber,
                typeTransaction: req.body.typeTransaction,
                photoUrl: req.file.location,
                proofPayment: req.body.proofPayment
            });

            const imageCollection = req.app.locals.imageCollection
            const uploaded = req.file.location
            console.log(req.file)

            newPayment.save()

            const userPayment = await User.findOneAndUpdate(

                { email: req.body.email }, 

                {
                $push: {
                paymentField: {
                uFirstName: req.body.uFirstName,
                uLastName: req.body.uLastName,
                uAddress: req.body.uAddress,
                uPhoneNumber: req.body.uPhoneNumber,
                refNumber: req.body.refNumber,
                typeTransaction: req.body.typeTransaction,
                photoUrl: req.file.location,
                email: req.body.email,
                },
                },
                }
                );


           

                userPayment.save(function (err, userPayment) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },


    addPost: async function  (req, res) {
        if ((!req.body.postCaption) || 
        (!req.body.postCategory) 

        ) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            const userInform = await User.findOne (
                {email: req.body.email});
            var newPost = Post(
                {
                postCaption: req.body.postCaption,
                postCategory: req.body.postCategory,
                photoUrl: req.file.location,
                postPicture: req.body.postPicture,
                postField: {photoUrlProfile: userInform.photoUrlProfile,
                            email: userInform.email,
                            firstName: userInform.firstName},
            });

            const imageCollection = req.app.locals.imageCollection
            const uploaded = req.file.location
            console.log(req.file)
    

            newPost.save(function (err, newPost) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },

    
    addNewSuggestion: function (req,res){
        if ((!req.body.suggestions) )
        {
            res.json ({success: false, msg: 'please enter your report'})
        } 
        else {
            var newSuggestion = Suggestion({
                aName: req.body.aName,
                suggestions: req.body.suggestions
            });
            newSuggestion.save(function(err,newSuggestion){
                if (err){
                    res.json({success: false, msg: 'Failed to save suggestion'})
                }
                else {
                    res.json({success: true, msg: 'Successfully Reported'})
                }
            })

        }
    },

        addNewVisitor: function (req, res) {
            if ((!req.body.fullName) ||   
            (!req.body.emailV) || 
            (!req.body.address) ||
            (!req.body.personVisit ) || 
            (!req.body.homeOwnerAddress) ||
            (!req.body.purpose)
            
            ) {
                res.json({success: false, msg: 'Enter all fields'})
            }
            else {
                var newVisitor = Visitor ({
                    fullName: req.body.fullName,
                    emailV: req.body.emailV,
                    address: req.body.address,
                    personVisit: req.body.personVisit,
                    homeOwnerAddress: req.body.homeOwnerAddress,
                    purpose: req.body.purpose               
                });
                newVisitor.save(function (err, newVisitor) {
                    if (err) {
                        res.json({success: false, msg: 'Failed to save'})
                    }
                    else {
                        res.json({success: true, msg: 'Successfully saved'})
                    }
                })
            }
        },

        addReservation: function (req, res) {
            if ((!req.body.rFirstName) ||   
            (!req.body.rLastName) || 
            (!req.body.rAddress) ||
            (!req.body.rPhoneNumber ) || 
            (!req.body.venue) ||
            (!req.body.reservationTime) ||
            (!req.body.reservationDate)
            ) {
                res.json({success: false, msg: 'Enter all fields'})
            }
            else {
                var newReservation = Reservation ({
                    rFirstName: req.body.rFirstName,
                    rLastName: req.body.rLastName,
                    rAddress: req.body.rAddress,
                    rPhoneNumber: req.body.rPhoneNumber,
                    venue: req.body.venue,
                    reservationTime: req.body.reservationTime,
                    reservationDate: req.body.reservationDate,                
                });
                newReservation.save(function (err, newReservation) {
                    if (err) {
                        res.json({success: false, msg: 'Failed to save'})
                    }
                    else {
                        res.json({success: true, msg: 'Successfully saved'})
                    }
                })
            }
        },

     

        

    
    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, decodedtoken})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    },

    postUserinfo: function(req,res){
        User.find({}, function(err,documents){
            if(err){
                res.send('Something went wrong');
            }
            else{
                res.send(documents);
            }
        })
    },

    postAnnouncement: function(req,res){
        Post.find({}, function(err,documents){
            if(err){
                res.send('Something went wrong');
            }
            else{
                res.send(documents);
            }
        })
    },

    postSuggestions: function (req,res){
        Suggestion.find({}, function(err,documents){
            if(err){
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postVisitors: function (req,res){
        Visitor.find({}, function(err,documents){
            if(err){
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postPet: function (req,res){
        Pet.find({}, function(err,documents){
            if(err){
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postCar: function (req,res){
        Car.find({}, function(err, documents){
            if(err){
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postPayment: function (req,res){
        Payment.find({}, function(err, documents){
            if(err){
                res.send('Something went wrong');
            }
            else {
                res.send(documents);

            }
        })
    },

  

        deleteDataUser: function (req,res){
            User.findOneAndDelete({

                email:req.body.email

            } , function(err){

                if(err){
                    res.send('Deleting Account Failed');
                }
                else{
                    res.send('Document Deleted Successfully')
                }
            })
        },

        checkEmail: function (req,res){
            User.findOne({email:req.params.email}, (err,result) => {
                    if(err) return res.status(500).json({msg:err});
                        if(result!==null)
                        {
                         return res.json({
                                Status: true,
                            });
                        }
                        else return res.json({
                            Status: false,
                        })

                    });
                },
                       

        changepass: function(req, res){
            let {newpass, password} = req.body;
            newpass = newpass.trim();
            password = password.trim();
           User.findOne({
                email:req.body.email
            },
            function (err, user){
               user.comparePassword(req.body.password, function(err, isMatch){ 
                        if(isMatch && !err){
    
                            bcrypt.genSalt(10, function(err, salt){
    
                                bcrypt.hash(newpass, salt, function(err,hash){
    
                                    newpass=hash;
    
                                    User.findOneAndUpdate(
                                        {email: req.body.email},
                                        {$set: {password:newpass}},
                                        (err, result) =>{
                                            if(err) return res.status (500).json({ msg: "Error updating password"});
    
                                            return res.json({ msg: newpass});
                                        }
                                    )
                                })
                            })
    
                              } else{
                            return res.status(403).send({success:false, msg: 'Wrong Password'})
                        }
                    })
    
    
    
            })
        },

        changeFirstname: function(req, res){
            let {newfirstname} = req.body;
            newfirstname = newfirstname.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {firstName:newfirstname}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating firstname"});
    
                    return res.json({ msg: newfirstname});
               })
             })
    
        },

        changeLastname: function(req, res){
            let {newlastname} = req.body;
            newlastname = newlastname.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {lastName:newlastname}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating lastname"});
    
                    return res.json({ msg: newlastname});
               })
             })
    
        },

        changeMiddleinitial: function(req, res){
            let {newmiddleinitial} = req.body;
            newmiddleinitial = newmiddleinitial.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {middleInitial:newmiddleinitial}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating middleinitial"});
    
                    return res.json({ msg: newmiddleinitial});
               })
             })
    
        },

        changeAddress: function(req, res){
            let {newaddress} = req.body;
            newaddress = newaddress.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {address:newaddress}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating address"});
    
                    return res.json({ msg: newaddress});
               })
             })
    
        },

        changePhonenumber: function(req, res){
            let {newphonenumber} = req.body;
            newphonenumber= newphonenumber.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {phoneNumber:newphonenumber}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating Phone Number"});
    
                    return res.json({ msg: newphonenumber});
               })
             })
    
        },





    
}

module.exports = functions