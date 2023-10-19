import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post("/register", controller.createUser);
router.post("/login", controller.loginControllers);

module.exports = router;
