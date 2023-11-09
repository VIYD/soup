const express = require('express');
const router = express.Router();
const { users } = require('../../models');
const bcrypt = require('bcrypt');

const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            username: username,
            password: hash,
        });

        res.json('Success');
        res.end();
    });
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await users.findOne({ where: {username: username} });

    if (!user) { res.json({ error: 'User does not exist.' }); }
    else {

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) { 
                res.json({ error: 'Wrong username or password.'}); 
            } else {
                const accessToken = sign({username: user.username, id: user.id}, 'importantsecret');

                res.json(accessToken);
            }
        })
    }

});

module.exports = router;