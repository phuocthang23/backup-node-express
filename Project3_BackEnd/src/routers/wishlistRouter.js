import checkAuthentication from "../middlewares/checkAuth";
import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post("/", [checkAuthentication], controller.createWishlist);
router.get("/", [checkAuthentication], controller.getAllWishlist);
router.get("/one", [checkAuthentication], controller.getOneWishlist);
router.put("/:id", [checkAuthentication], controller.updateWishlist);
router.delete("/:id", [checkAuthentication], controller.deleteWishlist);

module.exports = router;
