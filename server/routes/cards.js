const express = require("express");
const router = express.Router();
const { cards } = require("../../models");
const { validateToken } = require("../middleware/TokenMiddleware");

//Global ToDo:
//Send proper status-codes, PUT for editing
//Exceptions with proper codes
//Do this to TokenMiddleware also

router.get("/", async (req, res) => {
  const listOfCards = await cards.findAll();
  res.json(listOfCards);
  //Status code, E
});

router.get("/byID/:id", async (req, res) => {
  const id = req.params.id;
  const card = await cards.findByPk(id);

  if (card === null) {
    res.status(404).json({ error: 'Card by this ID was not found'})
  } else {
    res.json(card);
  }
});

router.post("/", validateToken, async (req, res) => {
  const card = req.body;
  const username = req.user.username;
  card.username = username;
  const createdCard = await cards.create(card);
  res.json({ id: createdCard.id });
  //ToDo:
  //Send whole json object to to user-side
  //Because considered as a good practice
});

router.delete("/:id", validateToken, async (req, res) => {
  const cardId = req.params.id;
  await cards.destroy({
    where: {
      id: cardId,
    },
  });
  res.send(200);
  //Consider changins:
  //res.status
});

module.exports = router;
