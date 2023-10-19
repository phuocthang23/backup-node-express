import checkAuthentication from "../middlewares/checkAuth";
import verifyRole from "../middlewares/checkRole";
import * as controller from "../controllers/cartController";
import express from "express";

const router = express.Router();

router.post("/", [checkAuthentication], controller.createCart);
router.get("/", controller.getAllCart);
router.get("/one", [checkAuthentication], controller.getAllCartByUser);
// router.put("/:id", [checkAuthentication], controller.updateAddress);
router.delete("/:id", [checkAuthentication], controller.deleteCart);

module.exports = router;
