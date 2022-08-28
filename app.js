const path = require('path')
const express = require('express')
const dotenv =  require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')


//Load config
dotenv.config( {path: './config/config.env'})


connectDB()

const app = express();

//Body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

//Middleware
app.set('views', path.join(__dirname, 'views'));

app.set("view engine", ".ejs")


//Session mmiddleware
const SECRET =  process.env.SECRET;

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    
    })
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))


//Passport config 
require('./config/passport')(passport)

//Static folder 
app.use(express.static(path.join(__dirname, 'public')))


//Routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

app.use('/', indexRouter)
app.use('/', authRouter)


const PORT = process.env.PORT || 8888

app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))