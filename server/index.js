const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const db = require('../models');

//routers
const cardRouter = require('./routes/cards');
app.use('/cards', cardRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })
});