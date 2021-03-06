var User = require('../models/user')
var Suggestion = require('../models/suggestion')
var Visitor = require('../models/visitor')
var Payment = require('../models/payment')
var Upload = require('../middleware/upload')
var Pet = require('../models/pet')
var Car = require('../models/car')
var Post = require('../models/post')
var MasterList = require('../models/masterList')
var Reservation = require('../models/reservation')
var AddFamily = require('../models/addFamily')
var nodemailer = require('../middleware/nodemailer');
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const cors = require('cors')
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
const moment = require('moment')
const sendEmail = require('../middleware/nodemailer');

// const express = require('express')

// const app = express()

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept","Access-Control-Allow-Credentials","Access-Control-Expose-Headers","Access-Control-Max-Age","Access-Control-Allow-Methods","Access-Control-Request-Method","Access-Control-Request-Headers","OPTIONS");
//   next();
// })
// app.use(cors());

var emailHomeOwner = "";
var fullName = "";


var functions = {
    addNew: function (req, res) {
        if ((!req.body.email) ||
            (!req.body.firstName) ||
            (!req.body.lastName) ||
            (!req.body.middleInitial) ||
            (!req.body.address) ||
            (!req.body.phoneNumber) ||
            (!req.body.password)

        ) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newUser = User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleInitial: req.body.middleInitial,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                role: req.body.role,
                photoUrlProfile: req.file.location,
                profilePicture: req.body.profilePicture,
                isActive: req.body.isActive,
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {

                    sendEmail({
                        to: [req.body.email], // array of email
                        subject: "Registration", //subject of the email
                        text: sendMessage(`Hi ${req.body.firstName}`,`Your account registration would be reviewed, please expect a call using this number 09292247988 and a visit to your registered address ${req.body.address}. <br><br>Got questions? You can also reply to this email.<br>Visit our Terms and Conditions. <br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                        <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>`), //1: for header, 2:body content
                        image: [image] //array of image
                    });

                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },

    addFamily: async function async(req, res) {
        if ((!req.body.aFirstName) ||
            (!req.body.aLastName) ||
            // (!req.body.aEmail) ||
            (!req.body.aPhoneNumber) ||
            (!req.body.Member)
        ) {
            res.json({ success: false, msg: 'Please Complete the form' })
        }
        else {
            var newFamily = AddFamily({
                aFirstName: req.body.aFirstName,
                aLastName: req.body.aLastName,
                // aEmail: req.body.aEmail,
                aAddress: req.body.aAddress,
                aPhoneNumber: req.body.aPhoneNumber,
                Member: req.body.Member,
                userId: req.body.userId
            });

            newFamily.save(function (err, newFamily) {
                    if (err) {
                        res.json({ success: false, msg: 'Failed to save Family Member' })
                    }
                    else {
                        res.json({ success: true, msg: 'Successfully Added Family Member' })
                    }
                })

            // const userFamily = await User.findOneAndUpdate(

            //     { email: req.body.email },
            //     {
            //         $push: {
            //             familyField: {
            //                 aFirstName: req.body.pFirstName,
            //                 aLastName: req.body.pLastName,
            //                 aEmail: req.body.aEmail,
            //                 aAddress: req.body.aAddress,
            //                 aPhoneNumber: req.body.aPhoneNumber,
            //                 Member: req.body.Member,
            //             },
            //         },
            //     }
            // );

            // console.log(userFamily),

                // userFamily.save(function (err, userFamily) {
                //     if (err) {
                //         res.json({ success: false, msg: 'Failed to save Family Member' })
                //     }
                //     else {
                //         res.json({ success: true, msg: 'Successfully Added Family Member' })
                //     }
                // })

        }

    },


    addPet: async function async(req, res) {
        if ((!req.body.pFirstName) ||
            (!req.body.pLastName) ||
            (!req.body.pAddress) ||
            (!req.body.pPhoneNumber) ||
            (!req.body.petName) ||
            (!req.body.petBreed)
        ) {
            res.json({ success: false, msg: 'please enter your Pet' })
        }
        else {
            var newPet = Pet({
                pFirstName: req.body.pFirstName,
                pLastName: req.body.pLastName,
                // pEmail: req.body.pEmail,
                pAddress: req.body.pAddress,
                pPhoneNumber: req.body.pPhoneNumber,
                petName: req.body.petName,
                petBreed: req.body.petBreed,
                // photoUrlPet: req.file.location,
                // petQRpicture: req.body.petQRpicture,
                userId: mongoose.Types.ObjectId(req.body.userId),
                pQR: req.body.pQR
            });

            // const imageCollection = req.app.locals.imageCollection
            // const uploaded = req.file.location
            // console.log(req.file)



            newPet.save(function (err, newPet) {
                        if (err) {
                            res.json({ success: false, msg: 'Failed to save Pet' })
                        }
                        else {
                            res.json({ success: true, msg: 'Successfully AddedPet' })
                        }
                    })

                }

            },

            // const userPet = await User.findOneAndUpdate(
            //     { email: req.body.email },
            //     {
            //         $push: {
            //             petField: {
            //                 pFirstName: req.body.pFirstName,
            //                 pLastName: req.body.pLastName,
            //                 pAddress: req.body.pAddress,
            //                 pEmail: req.body.pEmail,
            //                 pPhoneNumber: req.body.pPhoneNumber,
            //                 petName: req.body.petName,
            //                 petBreed: req.body.petBreed,
            //                 // photoUrlPet: req.file.location,
            //                 userId: mongoose.Types.ObjectId(req.body.userId),
            //                 pQR: req.body.pQR
            //             },
            //         },
            //     }
            // );

            // console.log(userPet),

            //     userPet.save(function (err, userPet) {
            //         if (err) {
            //             res.json({ success: false, msg: 'Failed to save Pet' })
            //         }
            //         else {
            //             res.json({ success: true, msg: 'Successfully AddedPet' })
            //         }
            //     })

    addCar: async function async(req, res) {
        if ((!req.body.cFirstName) ||
            (!req.body.cLastName) ||
            (!req.body.cAddress) ||
            (!req.body.cPhoneNumber) ||
            (!req.body.vehicleModel) ||
            (!req.body.plateNumber)
        ) {
            res.json({ success: false, msg: 'please enter your report' })
        }
        else {
            var newCar = Car({
                cFirstName: req.body.cFirstName,
                cLastName: req.body.cLastName,
                // cEmail: req.body.cEmail,
                cAddress: req.body.cAddress,
                cPhoneNumber: req.body.cPhoneNumber,
                vehicleModel: req.body.vehicleModel,
                plateNumber: req.body.plateNumber,
                // email: req.body.email,
                // photoUrlCar: req.file.location,
                // carQRpicture: req.body.carQRpicture,
                userId: mongoose.Types.ObjectId(req.body.userId),
                cQR: req.body.cQR
            });

            // const imageCollection = req.app.locals.imageCollection
            // const uploaded = req.file.location
            // console.log(req.file)

            newCar.save(function (err, newCar) {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to save Car' })
                            }
                            else {
                                res.json({ success: true, msg: 'Successfully AddedCar' })
                            }
                        })
            
           }
        },

    //         const userCar = await User.findOneAndUpdate(

    //             { cEmail: req.body.cEmail },

    //             {
    //                 $push: {
    //                     carField: {
    //                         cFirstName: req.body.cFirstName,
    //                         cLastName: req.body.cLastName,
    //                         cAddress: req.body.cAddress,
    //                         cEmail: req.body.cEmail,
    //                         cPhoneNumber: req.body.cPhoneNumber,
    //                         vehicleModel: req.body.vehicleModel,
    //                         plateNumber: req.body.plateNumber,
    //                         // photoUrlCar: req.file.location,
    //                         userId: mongoose.Types.ObjectId(req.body.userId),
    //                         cQR: req.body.cQR
    //                     },
    //                 },
    //             }
    //         )

    //         userCar.save(function (err, userCar) {
    //             if (err) {
    //                 res.json({ success: false, msg: 'Failed to save Car' })
    //             }
    //             else {
    //                 res.json({ success: true, msg: 'Successfully AddedCar' })
    //             }
    //         })

    //     }


    // },






    addPayment: async function (req, res) {
        if ((!req.body.uFirstName) ||
            (!req.body.uLastName) ||
            (!req.body.uAddress) ||
            (!req.body.uPhoneNumber) ||
            // (!req.body.refNumber) ||
            (!req.body.typeTransaction)  
            // (!req.body.paymentDate)

        ) {
            res.json({ success: false, msg: 'Enter all fields' })
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
                proofPayment: req.body.proofPayment,
                // paymentDate:  paymentDate,
                userId: mongoose.Types.ObjectId(req.body.userId),
                email: req.body.email
               
                // pPending: req.body.pPending
            });

            // const imageCollection = req.app.locals.imageCollection
            // const uploaded = req.file.location
            console.log(req.file)

            newPayment.save(function (err, userPayment) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {

                    sendEmail({
                        to: req.body.email, // array of email
                        subject: "Payment Transaction", //subject of the email
                        text: sendMessage(`Hi ${req.body.uFirstName}`,`Thank you for uploading your payment transaction thru Villboard, rest assured that our payment is being reviewed thoroughly. Please wait for Villa Caceres response thru email for your payment confirmation. <br>Got questions? You can also reply to this email<br>
                        Visit our Terms and Conditions.<br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                        <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>`), //1: for header, 2:body content
                        image: [image] //array of image
                    });
                    res.json({ success: true, msg: 'Transaction has been processed' })
                }
            })

            // const userPayment = await User.findOneAndUpdate(

            //     { email: req.body.email },

            //     {
            //         $push: {
            //             paymentField: {
            //                 uFirstName: req.body.uFirstName,
            //                 uLastName: req.body.uLastName,
            //                 uAddress: req.body.uAddress,
            //                 uPhoneNumber: req.body.uPhoneNumber,
            //                 refNumber: req.body.refNumber,
            //                 typeTransaction: req.body.typeTransaction,
            //                 photoUrl: req.file.location,
            //                 pPending: req.body.pPending,
            //                 // email: req.body.email
            //             },
            //         },
            //     },

            // )

            // userPayment.save(function (err, userPayment) {
            //     if (err) {
            //         res.json({ success: false, msg: 'Failed to save' })
            //     }
            //     else {
            //         res.json({ success: true, msg: 'Successfully saved' })
            //     }
            // })
        }
    },


    addPost: async function (req, res) {
        if ((!req.body.postCaption) ||
            (!req.body.postCategory)

        ) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            const userInform = await User.findOne(
                { email: req.body.email });
            var newPost = Post(
                {
                    postCaption: req.body.postCaption,
                    postCategory: req.body.postCategory,
                    photoUrl: req.file.location,
                    postPicture: req.body.postPicture,
                    postField: {
                        photoUrlProfile: userInform.photoUrlProfile,
                        email: userInform.email,
                        firstName: userInform.firstName,
                        // photoUrlProfile: req.file.location
                    },
                });

            const imageCollection = req.app.locals.imageCollection
            const uploaded = req.file.location
            console.log(req.file)

            // sortPost: function(req,res){
            //     Post.find().sort({timestamps: -1})
            // },

            // postSort();




            newPost.save(function (err, newPost) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })


        }
    },





    addNewSuggestion: function (req, res) {
        if ((!req.body.suggestions)) {
            res.json({ success: false, msg: 'please enter your report' })
        }
        else {
            var newSuggestion = Suggestion({
                aName: req.body.aName,
                suggestions: req.body.suggestions
            });
            newSuggestion.save(function (err, newSuggestion) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save suggestion' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully Reported' })
                }
            })

        }
    },

    addNewVisitor: function (req, res) {
        if ((!req.body.fullName) ||
            (!req.body.emailV) ||
            (!req.body.address) ||
            (!req.body.personVisit) ||
            (!req.body.contactHomeOwner) ||
            (!req.body.emailHomeOwner) ||
            (!req.body.homeOwnerAddress) ||
            (!req.body.purpose)

        ) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newVisitor = Visitor({
                fullName: req.body.fullName,
                emailV: req.body.emailV,
                address: req.body.address,
                personVisit: req.body.personVisit,
                contactHomeOwner: req.body.contactHomeOwner,
                telHomeOwner: req.body.telHomeOwner,
                emailHomeOwner: req.body.emailHomeOwner,
                homeOwnerAddress: req.body.homeOwnerAddress,
                purpose: req.body.purpose,
                referenceNumber: req.body.referenceNumber,
                timeOut: req.body.timeOut
            });
            newVisitor.save(function (err, newVisitor) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    //Send an email upon successful save
                    sendEmail({
                        to: [req.body.emailHomeOwner,req.body.emailV], // array of email
                        subject: "Test Email", //subject of the email
                        text: sendMessage(`Hi ${req.body.fullName}`,`This would serve as notification for both Homeowners and Visitors, for security purposes of the village, the homeowner would be called for this visit by our security team in the village. <br>Got questions? You can also reply to this email<br>
                        Visit our Terms and Conditions.<br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                        <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>`), //1: for header, 2:body content
                        image: [image] //array of image
                    });
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },

    addReservation: function (req, res) {
        console.log(req.body)
        if ((!req.body.rFirstName) ||
            (!req.body.rLastName) ||
            (!req.body.rAddress) ||
            (!req.body.rPhoneNumber) ||
            (!req.body.venue) ||
            (!req.body.reservationTime) ||
            (!req.body.reservationDate)
        ) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newReservation = Reservation({
                rFirstName: req.body.rFirstName,
                rLastName: req.body.rLastName,
                rAddress: req.body.rAddress,
                userId: mongoose.Types.ObjectId(req.body.userId),
                rPhoneNumber: req.body.rPhoneNumber,
                venue: req.body.venue,
                reservationTime: req.body.reservationTime,
                reservationDate: req.body.reservationDate,
                rPending: req.body.rPending,
                email: req.body.email
            });


            // const rDate = req.body.reservationDate

            // const rTime = req.body.reservationTime


            //  Reservation.findOne({reservationDate:req.body.reservationDate}, (err,result) => {
            //         if(err) return res.status(500).json({msg:err});
            //         if(result.reservationDate != rDate )
            //  Reservation.findOne({reservationTime:req.body.reservationTime}, (err,result) => {
            //         if(err) return res.status(500).json({msg:err});
            //         if(result.reservationDate != rTime )
            //                  {
            //                     return res.json({
            //                     Status: ("success" + true),
            //                              });
            //                             }
            //                             else return res.json({
            //                                 Status: ("already picked" + false),
            //                             });
            //                           } 
            //                         );
            //                     }
            //                 )


            newReservation.save(function (err, newReservation) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    
                    sendEmail({
                        to: req.body.email, // array of email
                        subject: "Reservation", //subject of the email
                        text: sendMessage(`Hi ${req.body.rFirstName}`,` Thank you for your reservation thru Villboard application, Villa Caceres would send you and email confirmation if your reservation has been approved via Email <br>Got questions? You can also reply to this email<br>
                        Visit our Terms and Conditions.<br><a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                        <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>`), //1: for header, 2:body content
                        image: [image] //array of image
                    });

                    res.json({ success: true, msg: 'Reservation would be processed' })
                }
            })
        }
    },


    addMasterList: function (req, res) {
            var newMasterList = MasterList({
                mFirstName: req.body.mFirstName,
                mLastName: req.body.mLastName,
                mEmail: req.body.mEmail,
                mAddress: req.body.mAddress,
                mPhoneNumber1: req.body.mPhoneNumber1,
                mPhoneNumber2: req.body.mPhoneNumber2,
                mTelNumber: req.body.mTelNumber,
                headFamily: req.body.headFamily,
                subFamily: req.body.subFamily,
                subPhoneNumber: req.body.subPhoneNumber,
                userId: mongoose.Types.ObjectId(req.body.userId),
            });
            newMasterList.save(function (err, newMasterList) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save MasterList' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully Save MasterList' })
                }
            })

        },







    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            if (user.status.toLowerCase() !== 'approved') {
                return res.status(403).send({ success: false, msg: 'Authentication Failed, Account not approved yet' })

            }

            if(user.isActive === 'login'){
              return res.status(403).send({ success: false, msg: 'someone logged in your account' })
            }

            // if(user.role === ['admin','security']){
            //     return res.status(403).send({ success: false, msg: 'Please login to our website if you are a Admin/Security' })
            //   }
            

            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, config.secret)

                    User.findOne({
                        email: req.body.email
                    },
                        function (err, user) {
            
                            User.findOneAndUpdate(
                                { email: req.body.email },
                                { $set: { isActive: "login" } },
                                (err, result) => {
                                    if (err) return res.status(500).json({ msg: "" });
            
                                    return res.json({ success: true, token: token });
                                })
                        })
                    // res.json({ success: true, token: token })
                }
                else {
                    return res.status(403).send({ success: false, msg: 'Authentication failed, wrong email/password' })
                }
            })
        }
        )
    },

    getinfo: async function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = await jwt.decode(token, config.secret)
            return res.json({ success: true, decodedtoken })
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    },





    postUserinfo: function (req, res) {
        User.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postReservation: function (req, res) {
        // Reservation.find({}, function (err, documents) {
        //     if (err) {
        //         res.send('Something went wrong');
        //     }
        //     else {
        //         res.send(documents);
        //     }
        // })

        Reservation.aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'user_reservation'
                }
            }, {
                '$unwind': {
                    'path': '$user_reservation',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ]).then((resp) => {
            res.send(resp);
        }).catch((err) => {
            res.status(500).json({ msg: "Reservation not found", err: err });
        })
    },


    getReservation: function (req, res) {
    
        Reservation.find({ rPending: 'approved' || 'APPROVED' }, function (err, result) {
            if (err) {
                return res.status(500).json({ msg: "Something went wrong" }); 
            }      
            return res.json(result);

        });
  
    },

    postFamily: function (req, res) {
        AddFamily.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },


    postAnnouncement: function (req, res) {
        Post.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postSuggestions: function (req, res) {
        Suggestion.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postVisitors: function (req, res) {
        Visitor.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postPet: function (req, res) {
        Pet.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postCar: function (req, res) {
        Car.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postMasterList: function (req, res) {
        MasterList.find({}, function (err, documents) {
            if (err) {
                res.send('Something went wrong');
            }
            else {
                res.send(documents);
            }
        })
    },

    postPayment: function (req, res) {
        Payment.aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'user_payment'
                }
            }, {
                '$unwind': {
                    'path': '$user_payment',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ]).then((resp) => {
            res.send(resp);
        }).catch((err) => {
            res.status(500).json({ msg: "Transaction not found", err: err });
        })
    },

    deleteDataUser: function (req, res) {
        User.findOneAndDelete({

            email: req.body.email

        }, function (err) {

            if (err) {
                res.send('Deleting Account Failed');
            }
            else {
                res.send('Document Deleted Successfully')
            }
        })
    },

    deleteUpdateUser: function (req, res) {
        User.findOneAndUpdate({
            email: req.body.email
        }, function (err) {

            if (err) {
                res.send('Deleting Account Failed');
            }
            else {
                res.send('Document Deleted Successfully')
            }
        })
    },




    checkEmail: function (req, res) {
        User.findOne({ email: req.params.email }, (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            if (result !== null) {
                return res.json({
                    Status: true,
                });
            }
            else return res.json({
                Status: false,
            })

        });
    },


    changepass: function (req, res) {
        let { newpass, password } = req.body;
        newpass = newpass.trim();
        password = password.trim();
        User.findOne({
            email: req.body.email
        },
            function (err, user) {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {

                        bcrypt.genSalt(10, function (err, salt) {

                            bcrypt.hash(newpass, salt, function (err, hash) {

                                newpass = hash;

                                User.findOneAndUpdate(
                                    { email: req.body.email },
                                    { $set: { password: newpass } },
                                    (err, result) => {
                                        if (err) return res.status(500).json({ msg: "Error updating password" });

                                        return res.json({ msg: "Successfully Changed" });
                                    }
                                )
                            })
                        })

                    } else {
                        return res.status(403).send({ success: false, msg: 'Wrong Password' })
                    }
                })



            })
    },


    changeTimeOut: function (req, res) {
        Visitor.findOne({
            referenceNumber: req.body.referenceNumber
        },
            function (err, user) {

                Visitor.findOneAndUpdate(
                    { referenceNumber: req.body.referenceNumber },
                    { $set: { timeOut: "outVillage" } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating timeOut" });

                        return res.json({ msg: "Outside The Village" });

                        sendEmail({
                            to: [req.body.emailV], // array of email
                            subject: "Villa Caceres", //subject of the email
                            text: sendMessage(`Hi ${req.body.fullName}`,`Thanks!`), //1: for header, 2:body content
                            image: [image] //array of image
                            
                        });

                    })
            })

    },


    // changerefrNumber: function (req, res) {
    //     let { newrefrNumber } = req.body;
    //     newrefrNumber = newrefrNumber.trim();

    //     Payment.findOne({
    //         ????        : req.body.referenceNumber
    //     },
    //         function (err, user) {

    //             Visitor.findOneAndUpdate(
    //                 { referenceNumber: req.body.refrenceNumber },
    //                 { $set: { refrNumber: newrefrNumber } },
    //                 (err, result) => {
    //                     if (err) return res.status(500).json({ msg: "Error updating timeOut" });

    //                     return res.json({ msg: refrNumber });

    //                 })
    //         })

    // },


    changeFirstname: function (req, res) {
        let { newfirstname } = req.body;
        newfirstname = newfirstname.trim();

        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { firstName: newfirstname } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating firstname" });

                        return res.json({ msg: newfirstname });
                    })
            })

    },

    changeLastname: function (req, res) {
        let { newlastname } = req.body;
        newlastname = newlastname.trim();

        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { lastName: newlastname } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating lastname" });

                        return res.json({ msg: newlastname });
                    })
            })

    },

    changeMiddleinitial: function (req, res) {
        let { newmiddleinitial } = req.body;
        newmiddleinitial = newmiddleinitial.trim();

        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { middleInitial: newmiddleinitial } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating middleinitial" });

                        return res.json({ msg: newmiddleinitial });
                    })
            })

    },

    changeAddress: function (req, res) {
        let { newaddress } = req.body;
        newaddress = newaddress.trim();

        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { address: newaddress } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating address" });

                        return res.json({ msg: newaddress });
                    })
            })

    },

    changePhonenumber: function (req, res) {
        let { newphonenumber } = req.body;
        newphonenumber = newphonenumber.trim();

        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { phoneNumber: newphonenumber } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating Phone Number" });

                        return res.json({ msg: newphonenumber });
                    })
            })

    },

    logout: function (req, res) {
        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { isActive: "logout" } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating active status" });

                        return res.json({ msg: "Your account has been successfully logout" });
                    })
            })

    },

    

    changeRole: function (req, res) {
        let { newrole } = req.body;
        newrole = newrole.trim();

        User.findOne({
            email: req.body.email
        },
            function (err, user) {

                User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { role: newrole } },
                    (err, result) => {
                        if (err) return res.status(500).json({ msg: "Error updating Role" });

                        return res.json({ msg: newrole });
                    })
            })

    },

    resetPassword: function (req,res){
        var a = "";

        User.findOne({
            email: req.body.email
        },
            function (err, user) {
               a = user._id;

                if (!user) {
                    return res.status(403).send({ success: false, msg: 'User not found' })
                }
                sendEmail({
                    to: req.body.email, // array of email
                    subject: "ResetPassword", //subject of the email
                    text: sendMessage(`Hi ${req.body.email}`,`Reset Password. Click:<a href="https://villboard-23c49.web.app/Forgot_Password?resetPassword=${a}" style='color:blue'>here</a>to reset password <br>Got questions? You can also reply to this email<br>
                    Visit our Terms and Conditions. <br><a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                    <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a></p>`), //1: for header, 2:body content
                    image: [image] //array of image
                    });
                    
                res.sendStatus(202);
            })
    },

    updatePassword: function (req,res){
        let {newpass} = req.body;
        newpass = newpass.trim();

        console.log(newpass)

        User.findOne({
            _id: req.body._id
        },
       
            function (err, user) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(newpass, salt, function (err, hash) {

                                newpass = hash;

                                User.findOneAndUpdate(
                                    { _id: req.body._id },
                                    { $set: { password: newpass } },
                                    (err, result) => {
                                        if (err) return res.status(500).json({ msg: "Error updating password" });

                                        return res.json({ msg: "Successfully Changed" });
                                    }
                                )
                            })
                        })
                        sendEmail({
                            to: req.body.email, // array of email
                            subject: "Reservation", //subject of the email
                            text: sendMessage(`Hi ${req.body.email}`,` You have successfully change your password. <br> Got questions? You can also reply to this email<br>
                            Visit our Terms and Conditions.<br><a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                            <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>`), //1: for header, 2:body content
                            image: [image] //array of image
                        });

                    }
            )

    },

    approveDeclineAccount: async function (req, res) {
        let { account, verdict } = req.body;

        if (verdict !== 'approved') {
            await User.findByIdAndRemove(account._id, { useFindAndModify: false }, async function (err, result) {
                if (err) {
                    return res.status(500).json({ msg: "User not found" });
                }

                await sendEmail({
                    to: account.email,
                    subject: "Account Registration Declined",
                    text: sendMessage(`Hi ${account.firstName},`, `We do apologize your registration has been declined, our administrator was unable to validate the document that has been uploaded to our system to continue with your registration just upload the correct document in the application or our website <br>(LINK).

                    This are the documents that can be uploaded to the system.
                    *Home Owners membership certificate <br>(Picture)
                    *Land Title <br>(Picture)<br>
                    
                    Got questions? You can also reply to this email<br>
                    Visit our Terms and Conditions. <br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> <br><br>
                    
                    Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> </a>`),
                    image: [image]
                    //link
                    //villacasereser.com/emailacknowledge.php/post?id="1234",acknowledge="confirmed"
                });
                // console.log(image)

                // res.status(200).json({
                //     success: true,
                //     data: "Email Sent for Account activation"
                // });

                return res.json({ msg: 'Account declined successfully' });
            });
        } else {
            await User.findByIdAndUpdate(account._id, { status: verdict }, { new: true, useFindAndModify: false }, async function (err, result) {
                if (err) {
                    return res.status(500).json({ msg: "User not found" });
                }

                await sendEmail({
                    to: account.email,
                    subject: "Account Registration Approved",
                    text: sendMessage(`Hi ${result.firstName},`, `Your registration has been approved by the ADMIN of Villa Caceres you may now start to enjoy our Mobile Application for Villboard.  <br><br>
                    Got questions? You can also reply to this email <br>
                    Visit our Terms and Conditions.<br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_condition </a><br><br>
                    
                    Download Villboard Here:<a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> </a>`),
                    image: [image]
                });
                return res.json(result);

            });
        }

    },

    getPendingAccounts: async function (req, res) {
        User.find({ status: 'pending' }, function (err, result) {
            if (err) {
                return res.status(500).json({ msg: "Something went wrong" });
            }
            return res.json(result);

        });
    },

    getPendingReservations: async function (req, res) {
        Reservation.find({ rPending: 'pending' || 'PENDING' }, function (err, result) {
            if (err) {
                return res.status(500).json({ msg: "Something went wrong" });
            }
            return res.json(result);

        });
    },

    getPendingTransactions: async function (req, res) {
        Payment.find({ pPending: 'pending' || 'PENDING' }, function (err, result) {
            if (err) {
                return res.status(500).json({ msg: "Something went wrong" });
            }
            return res.json(result);

        });
    },

    approveDeclineReservation: async function (req, res) {
        let { reserveItem, verdict, reason } = req.body;

        // if (verdict !== 'approved') {
        //     await User.findByIdAndRemove(reserveId, { useFindAndModify: false }, function (err, result) {
        //         if (err) {
        //             return res.status(500).json({ msg: "User not found" });
        //         }
        //         return res.json({ msg: 'Account declined successfully' });
        //     });
        // } else {
        await Reservation.findByIdAndUpdate(reserveItem._id, { rPending: verdict, reason }, { new: true, useFindAndModify: false }, async function (err, result) {
            if (err) {
                return res.status(500).json({ msg: "Reservation not found" });
            }

            var reasonText = reason === "" ? "" : ' Due to following reason ' + reason;
            if (verdict === 'approved') {
                await sendEmail({
                    to: reserveItem.user_reservation.email,
                    subject: "Reservation Approved",
                    text: sendMessage(`Hi ${reserveItem.rFirstName},`, `Congratulations! Your reservation has been approved by the ADMIN of Villa Caceres. For the reservation of ${reserveItem.venue} with the date and time of ${moment(reserveItem.reservationDate).format('ll')}, ${reserveItem.reservationTime} thank you for reservation. <br>Got questions? You can also reply to this email.<br>Visit our Terms and Conditions. <br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                    <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>`),
                    image: [image]
                });
            } else {
                await sendEmail({
                    to: reserveItem.user_reservation.email,
                    subject: "Reservation Declined",
                    text: sendMessage(`Hi ${reserveItem.rFirstName},`, `Sorry! Your reservation has been declined by the ADMIN of Villa Caceres. For the reservation of ${reserveItem.venue} with the date of ${moment(reserveItem.reservationDate).format('ll')}.${reasonText} <br>Got questions? You can also reply to this email.<br>Visit our Terms and Conditions. <br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions</a>
                    <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>
                    `),
                    image: [image]
                });
            }
            return res.json(result);

        });

    },

    approveDeclineTransaction: async function (req, res) {
        let { transItem, verdict, reason } = req.body;
        
        // if (verdict !== 'approved') {
        //     await User.findByIdAndRemove(reserveId, { useFindAndModify: false }, function (err, result) {
        //         if (err) {
        //             return res.status(500).json({ msg: "User not found" });
        //         }
        //         return res.json({ msg: 'Account declined successfully' });
        //     });
        // } else {
        await Payment.findByIdAndUpdate(transItem._id, { pPending: verdict, reasonNote: reason }, { new: true, useFindAndModify: false }, async function (err, result) {
            if (err) {
                return res.status(500).json({ msg: "Reservation not found" });
            }

            var reasonText = reason === "" ? "" : ' Due to following reason ' + reason;
            if (verdict === 'approved') {
                await sendEmail({
                    to: transItem.user_payment.email,
                    subject: "Payment Approved",
                    text: sendMessage(`Hi ${transItem.uFirstName},`, `Congratulations! Your payment receipt has been confirmed by the ADMIN of Villa Caceres. <br><br>Got questions? You can also reply to this email.<br> <a href="https://villboard-23c49.web.app/Terms_conditions"> https://villboard-23c49.web.app/Terms_conditions </a> 
                    <br><br>Download Villboard Here:<br><a href="https://drive.google.com/file/d/18iBQu778YpjXTBSsuMAjg7RfiKKXq-1a/view?usp=sharing"> https://drive.google.com/file/d/18iBQu778YpjXTBSsuMAjg7RfiKKXq-1a/view?usp=sharing </a>
                    `),
                    image: [image]
                });
            } else {
                await sendEmail({
                    to: transItem.user_payment.email,
                    subject: "Payment Declined",
                    text: sendMessage(`Hi ${transItem.uFirstName},`, `Sorry! Your payment receipt has been declined by the ADMIN of Villa Caceres. due to the following reasons Incorrect reference number, Image is blurry, Same reference number with other transactions <br><br>Got questions? You can also reply to this email.<br>Visit our Terms and Conditions. <br> <a href="https://villboard-23c49.web.app/Terms_conditions"> ttps://villboard-23c49.web.app/Terms_conditions </a> 
                    <br><br>Download Villboard Here:<br><a href="https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing"> https://drive.google.com/drive/folders/1tjAoLTgRIkzO87zzJYvdaWxUMvzfNk4_?usp=sharing </a>
                    `),
                    image: [image]
                });
            }
            return res.json(result);

        });

    },
    //  notifyHomeOwner : function (fullname, email) {
        
    //     sendEmail({
    //         to: email,
    //         subject: "Payment Declined",
    //         text: sendMessage(`Hi ${fullname},`, `Sorry! Your payment receipt has been declined by the ADMIN of Villa Caceres.${reasonText} <br><br>Got questions? You can also reply to this email.<br>Visit our Terms and Conditions. <br>(LINK) 
    //         <br><br>Download Villboard Here:<br>(LINK)
    //         `)
    //     });
    //  }

}

let image = {};
image.filename = 'villboard.png';
image.path = './methods/villboard.png';
image.cid = 'bannerimage12345';

const sendMessage = (header, text) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    
    <style>
        .main-container{
            background: white; 
            margin: 40px 150px 40px 150px;
        }
        h1{
            font-family: 'PT Sans', sans-serif;
            color:black;
        }
        p{
            font-family: 'Open Sans', sans-serif;
            color: black;
        }
        a{
            cursor: pointer; 
            color: white; 
            padding: 10px; 
            width: 80%; 
            margin: auto;
            border: none;
        }
        h1 a {
            text-decoration:none;
            color:black;
        }
      
        @media (min-width: 701) and (max-width: 1000px){
            .main-container{
                background: white; 
                padding: 20px 60px 20px 60px;
                margin:0;
            }
        }

        @media (min-width: 350px) and (max-width: 700px){
            .main-container{
                background: white; 
                padding: 20px;
                margin: 0;
            }
        }
    </style>
    </head>
    <body>
        <div class="main-container">   
            <center>
                <img src="cid:bannerimage12345" height="150" width="150" alt="Logo"/> 
            </center>
            <h1>${header}</h1><br>
            <p style="font-size:120%;"> ${text} </p><br>
        </div>
    </body>
    </html>
    `
}
//<a href=${link} clicktracking=off>Link</a>
module.exports = functions