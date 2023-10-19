import checkAuthentication from "../middlewares/checkAuth";
import checkRole from "../middlewares/checkRole";
import uploadProduct from "../middlewares/uploadImgProduct";

import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post(
  "/",
  [checkAuthentication, checkRole, uploadProduct.array("images", 5)],
  controller.createImageProductController
);
router.get("/", controller.getAllImageProductController);
router.get("/:id", controller.getOneImageProductController);
router.put(
  "/:id",
  [checkAuthentication, checkRole],
  uploadProduct.single("src"),
  controller.updateImageProductController
);
router.delete(
  "/:id",
  [checkAuthentication, checkRole],
  controller.deleteImageProductController
);

module.exports = router;
