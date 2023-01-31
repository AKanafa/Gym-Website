const express = require("express");
const router = express.Router();

const clientApiController = require("../../api/ClientAPI");

router.get("/", clientApiController.getKlient);
router.get("/:clientId", clientApiController.getKlientById);
router.post("/", clientApiController.createKlient);
router.put("/:clientId", clientApiController.updateKlient);
router.delete("/:clientId", clientApiController.deleteKlient);

module.exports = router;
