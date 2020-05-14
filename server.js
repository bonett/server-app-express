require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', () => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const specialtiesRouter = require('./routes/specialties');
const providersRouter = require('./routes/providers');

app.use('/specialties', specialtiesRouter);
app.use('/providers', providersRouter);


app.listen(3000, () => console.log('server started on port'));