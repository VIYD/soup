const express = require('express');
const router = express.Router();
const { cards } = require('../../models');

router.get('/', async (req, res) => {
   const listOfCards = await cards.findAll();
   res.json(listOfCards);
});

router.post('/', async (req, res) => {
    const card = req.body;

    await cards.create(card);
    res.json(card);
})

module.exports = router;