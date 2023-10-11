const router = require("express").Router();
const controller = require("./urls.controller");
const usesRouter = require("../uses/uses.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:urlId/uses", controller.urlExists, usesRouter);

router.route("/:urlId")
  // to make a GET request that uses read()
  .get(controller.read)
  // to make a PUT request that uses update()
  .put(controller.update)
  // to return 405 status code for any otherwise unhandled method
  .all(methodNotAllowed);

router
  .route("/")
  // to make a GET request that uses list()
  .get(controller.list)
  // to make a POST request that uses create()
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;