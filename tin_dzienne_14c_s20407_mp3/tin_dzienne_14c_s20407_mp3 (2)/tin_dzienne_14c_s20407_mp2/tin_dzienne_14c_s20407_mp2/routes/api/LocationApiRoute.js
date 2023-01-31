const express = require("express");
const router = express.Router();

const locApiController = require("../../api/LocationAPI");

router.get("/", locApiController.getLokalizacja);
router.get("/:locationID", locApiController.getLokalizacjaById);
router.post("/", locApiController.createLokalizacja);
router.put("/:locationID", locApiController.updateLokalizacja);
router.delete("/:locationID", locApiController.deleteLokalizacja);

module.exports = router;
