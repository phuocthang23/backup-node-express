import checkAuthentication from "../middlewares/checkAuth";
import verifyRole from "../middlewares/checkRole";
import * as controller from "../controllers/orderController";
import express from "express";

const router = express.Router();

router.post("/", [checkAuthentication], controller.createOrderController);
router.get(
  "/",
  [checkAuthentication, verifyRole],
  controller.getAllOrderController
);
router.get("/one", [checkAuthentication], controller.getAllOrderByUser);
// router.put("/:id", [checkAuthentication], controller.updateAddress);
// router.delete("/:id", [checkAuthentication], controller.deleteAddress);

module.exports = router;
