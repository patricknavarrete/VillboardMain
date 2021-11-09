const path  = require('path')
const multer = require('multer')
const aws = require ('aws-sdk')
const multerS3 = require('multer-s3')
const uuid = require ('uuid').v4;
require('dotenv').config();
aws.config.loadFromPath('./config.json')




const s3= new aws.S3({apiVersion:'2006-03-01',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION});





const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'villboard-main',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});




module.exports = upload