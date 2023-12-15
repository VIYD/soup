const express = require("express");
const router = express.Router();
const { cards } = require("../../models");
const { validateToken } = require("../middleware/TokenMiddleware");

router.get("/", async (req, res) => {
  try {
    const listOfCards = await cards.findAll();
    res
      .status(200)
      .json(listOfCards);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

router.get("/byID/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const card = await cards.findByPk(id);

    if (card === null) {
      res
        .status(404)
        .json({ error: "Card by this ID was not found" });
    } else {
      res
        .status(200)
        .json(card);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const card = req.body;
    const username = req.user.username;
    const userID = req.user.ID;

    card.username = username;
    card.userID = userID;

    const createdCard = await cards.create(card);
    res
      .status(201)
      .json(createdCard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

router.put("/title", validateToken, async (req, res) => {
  try {
    const { newTitle, id } = req.body;
    await cards.update({ title: newTitle }, { where: { id: id } });
    res
      .status(200)
      .json(newTitle);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

router.put("/description", validateToken, async (req, res) => {
  try {
    const { newDescription, id } = req.body;
    await cards.update({ description: newDescription }, { where: { id: id } });
    res
      .status(200)
      .json(newDescription);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  try {
    const cardId = req.params.id;
    await cards.destroy({
      where: {
        id: cardId,
      },
    });
    res
      .sendStatus(200);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

module.exports = router;
