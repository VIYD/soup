const express = require("express");
const router = express.Router();
const { users } = require("../../models");
const bcrypt = require("bcrypt");

const { validateToken } = require("../middleware/TokenMiddleware");
const { activationMiddleware, isCodeValid } = require('../middleware/MailMiddleware');

const { sign } = require("jsonwebtoken");

router.post("/register", activationMiddleware, async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await users.findOne({ where: { username: username } });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username is already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.create({
      username: username,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await users.findOne({ where: { username: username } });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "Wrong username or password." });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    return res
      .status(200)
      .json({ token: accessToken, username: user.username, id: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

router.get("/checkAuth", validateToken, (req, res) => {
  res
    .status(200)
    .json(req.user);
});

module.exports = router;
