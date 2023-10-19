import checkAuthentication from "../middlewares/checkAuth";
import checkRole from "../middlewares/checkRole";

import * as controller from "../controllers";
import express from "express";
import uploadProduct from "../middlewares/uploadImgProduct";
const router = express.Router();

router.post(
  "/",
  [checkAuthentication, checkRole],
  uploadProduct.array("images", 5),
  controller.createProductController
);
router.get("/", controller.getAllProductController);
router.get("/:id", controller.getOneProductController);
router.put(
  "/:id",
  [checkAuthentication, checkRole],
  controller.updateProductController
);
router.delete(
  "/:id",
  [checkAuthentication, checkRole],
  controller.deleteProductController
);

module.exports = router;
