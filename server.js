require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const cors = require('cors')

// connect to mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

// checking connection status
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to DB'))

// how we grab and send info to the web
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// creted router in other file
const apiRouter = require('./routes/apiRouter')

// sets endpoint
app.use('/api', apiRouter)

// tells server to listne on a port
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
