const express = require("express");
const router = express.Router();
const { users } = require("../../models");
const bcrypt = require("bcrypt");

const { validateToken } = require("../middleware/TokenMiddleware");
const { sign } = require("jsonwebtoken");

//Check ToDo from cards.js

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      username: username,
      password: hash,
    });

    res.json("Success");
    res.end();
    //Status code, E
    //Check .end
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User does not exist." });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username or password." });
        //Status code
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );

        res.json({ token: accessToken, username: user.username, id: user.id });
        //Status code
      }
    });
  }
});

router.get("/checkAuth", validateToken, (req, res) => {
  res.json(req.user);
  //E already done, Status code, E already doen
});

module.exports = router;
