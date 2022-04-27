// const nodemailer = require ('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth:{
//         user: "villboard@outlook.com",
//         pass: "boardVill123!"
//  }
// });

// const options = {
//     from: "villboard@outlook.com",
//     to: "patricknavarrete1998@gmail.com",
//     subject: "Sending Email with Node",
//     Text: "Simple"


// };

// transporter.sendMail(options, function (err,info){
//     if(err){
//         console.log(err);
//         return;
//     } 
//     console.log("sent"+ info.response);
    
// })

const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
        attachments: options.image
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    })
}

module.exports = sendEmail;