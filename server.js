require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const specialtiesRouter = require('./routes/specialties');
const providersRouter = require('./routes/providers');
const staffRouter = require('./routes/staff');
const statusRouter = require('./routes/status');
const typesRouter = require('./routes/types');
const port = 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DEV_DB).then(
    () => { console.log('Connected to Database') },
    err => { console.log(err) }
);

app.use(express.json());

app.use('/specialties', specialtiesRouter);
app.use('/providers', providersRouter);
app.use('/staff', staffRouter);
app.use('/status', statusRouter);
app.use('/types', typesRouter);


app.listen(port, () => console.log(`server started on port ${port}`));