import checkAuthentication from "../middlewares/checkAuth";
import checkRole from "../middlewares/checkRole";

import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post(
  "/",
  [checkAuthentication, checkRole],
  controller.createSizeController
);
router.get("/", controller.getAllSizeController);
router.get("/:id", controller.getOneSizeController);
router.put(
  "/:id",
  [checkAuthentication, checkRole],
  controller.updateSizeController
);
router.delete(
  "/:id",
  [checkAuthentication, checkRole],
  controller.deleteSizeController
);

module.exports = router;
