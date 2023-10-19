import checkAuthentication from "../middlewares/checkAuth";
import verifyRole from "../middlewares/checkRole";
import * as controller from "../controllers/orderItemController";
import express from "express";

const router = express.Router();

router.post("/", [checkAuthentication], controller.createOrderItem);
router.get("/", controller.getAllOrderController);
router.get("/one", [checkAuthentication], controller.getAllOrderItemByUser);
module.exports = router;
