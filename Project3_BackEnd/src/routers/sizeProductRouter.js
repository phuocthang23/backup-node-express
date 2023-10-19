import checkAuthentication from "../middlewares/checkAuth";
import checkRole from "../middlewares/checkRole";

import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post(
  "/",
  [checkAuthentication, checkRole],
  controller.createSizeProductController
);
router.get("/", controller.getAllSizeProductController);
router.get("/:id", controller.getOneSizeProductController);
router.put(
  "/:id",
  [checkAuthentication, checkRole],
  controller.updateSizeProductController
);
router.delete(
  "/:id",
  [checkAuthentication, checkRole],
  controller.deleteSizeProductController
);

module.exports = router;
