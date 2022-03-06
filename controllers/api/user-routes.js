const router = require("express").Router();
const { Comment, Post, User } = require("../../models");

router.post("/login", (req, res) => {
  console.log("======= logging in user =======");
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({
          message: "No user with that email address/password combination.",
        });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({
          message: "No user with that email address/password combination.",
        });
        return;
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/signup", (req, res) => {
  console.log("======== creating user ========");
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      res.json({
        user: dbUserData,
        message: "You are now signed up, please log in to continue!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      console.log("You are now logged out!");
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
