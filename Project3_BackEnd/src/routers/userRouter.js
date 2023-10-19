import * as controller from "../controllers";
import express from "express";
import uploadCloud from "../middlewares/uploadCloud";
import checkAuthor from "../middlewares/checkAuth";
import verifyRole from "../middlewares/checkRole";

const router = express.Router();

router.get("/", [checkAuthor, verifyRole], controller.getAllUser);
router.get("/one", [checkAuthor], controller.getOneUser);
router.put(
  "/up",
  [checkAuthor, uploadCloud.single("avatar")],
  controller.updateUser
);
router.delete("/:id", [checkAuthor, verifyRole], controller.deleteUser);

module.exports = router;
//
