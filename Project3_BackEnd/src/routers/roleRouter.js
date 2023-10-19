import * as controller from "../controllers";
import express from "express";

const router = express.Router();

router.post("/", controller.createRole);
router.get("/", controller.getAllRole);
router.get("/:id", controller.getOneRole);
router.put("/:id", controller.updateRole);
router.delete("/:id", controller.deleteRole);

module.exports = router;
