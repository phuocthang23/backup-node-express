import checkAuthentication from "../middlewares/checkAuth";
import verifyRole from "../middlewares/checkRole";
import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post("/", [checkAuthentication], controller.createAddress);
router.get("/", [checkAuthentication, verifyRole], controller.createAddress);
router.get("/:id", [checkAuthentication], controller.getOneAddress);
router.put("/:id", [checkAuthentication], controller.updateAddress);
router.delete("/:id", [checkAuthentication], controller.deleteAddress);

module.exports = router;
