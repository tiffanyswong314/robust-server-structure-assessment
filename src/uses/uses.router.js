const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
  // to make a GET request that uses list() with the uses data
  .get(controller.list)
  .all(methodNotAllowed);

router.route("/:useId")
  // to make a GET request that uses read() for a specific use
  .get(controller.read)
  // to make a DELETE request that uses destroy() for a specific use
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;