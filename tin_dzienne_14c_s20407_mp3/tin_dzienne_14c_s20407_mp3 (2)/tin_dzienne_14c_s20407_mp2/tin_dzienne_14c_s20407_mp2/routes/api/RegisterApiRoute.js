const express = require("express");
const router = express.Router();

const regApiController = require("../../api/RegisterAPI");

router.get("/", regApiController.getRejestracje);
router.get("/:registerId", regApiController.getRejestracjeById);
router.post("/", regApiController.createRejestracje);
router.put("/:registerId", regApiController.updateRejestracje);
router.delete("/:registerId", regApiController.deleteRegister);

module.exports = router;
