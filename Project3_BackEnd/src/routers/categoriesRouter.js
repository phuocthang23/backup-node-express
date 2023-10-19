import checkAuthentication from "../middlewares/checkAuth";
import checkRole from "../middlewares/checkRole";
import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post(
  "/",
  [checkAuthentication, checkRole],
  controller.createCategoriesController
);
router.get("/", controller.getAllCategories);
router.get("/:id", controller.getOneCategories);
router.put(
  "/:id",
  [checkAuthentication, checkRole],
  controller.updateCategoriesServices
);
router.delete(
  "/:id",
  [checkAuthentication, checkRole],
  controller.deleteCategories
);

module.exports = router;
