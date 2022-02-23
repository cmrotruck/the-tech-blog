const router = require("express").Router();
const userRoute = require("./user-routes.js");
const commentRoute = require("./comment-routes");

router.use("/users", userRoute);
router.use("/comments", commentRoute);

module.exports = router;
