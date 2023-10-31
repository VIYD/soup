const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;

app.use(express.json());
app.use(cors());

const db = require('../models');

//routers
const cardRouter = require('./routes/cards');
app.use('/cards', cardRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })
});