require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', () => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const specialitiesRouter = require('./routes/specialities')
app.use('/specialities', specialitiesRouter)


app.listen(3000, () => console.log('server started on port'))