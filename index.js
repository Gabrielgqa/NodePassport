const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()

require('./src/auth/local')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: '!#FDSAFDF@!!', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

require('./src/index')(app, passport)

mongoose.connect('mongodb://localhost:27017/auth')
mongoose.Promise = global.Promise
app.listen(9000, () =>{
    console.log('Express has been started!')
})