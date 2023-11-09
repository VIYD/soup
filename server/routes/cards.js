const express = require('express');
const router = express.Router();
const { cards } = require('../../models');
const { validateToken } = require('../middleware/TokenMiddleware');

router.get('/', async (req, res) => {
   const listOfCards = await cards.findAll();
   res.json(listOfCards);
});

router.get('/byID/:id', async (req, res) => {
    const id = req.params.id;
    const card = await cards.findByPk(id);
    res.json(card);
});

router.post('/', validateToken, async (req, res) => {
    const card = req.body;
    const createdCard = await cards.create(card);
    res.json({ id: createdCard.id });
});

module.exports = router;