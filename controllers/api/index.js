const router = require("express").Router();
const userRoute = require("./user-routes.js");
const commentRoute = require("./comment-routes");
const postRoute = require("./post-routes");

router.use("/users", userRoute);
router.use("/comments", commentRoute);
router.use("/post", postRoute);

module.exports = router;
