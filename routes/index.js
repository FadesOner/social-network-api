const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>404 Error</h1> <br> <h3>please try again</h3>");
});

module.exports = router;
