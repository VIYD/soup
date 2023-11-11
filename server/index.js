const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());

const db = require('../models');

//routers
const cardsRouter = require('./routes/cards.js');
app.use('/cards', cardsRouter);

const usersRouter = require('./routes/users.js');
app.use('/auth', usersRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`SERVER is listening on port ${port}`)
  })
});