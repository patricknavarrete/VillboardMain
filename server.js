const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes/index')




connectDB()

const app = express()

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept","Access-Control-Allow-Credentials","Access-Control-Expose-Headers","Access-Control-Max-Age","Access-Control-Allow-Methods","Access-Control-Request-Method","Access-Control-Request-Headers","OPTIONS");
  next();
})
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}





 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)
app.use(passport.initialize())
require('./config/passport')(passport)


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))