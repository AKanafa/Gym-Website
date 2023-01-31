const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/", clientController.showKlientList);
router.get("/add", clientController.showKlientForm);
router.get("/form-detail/:clientID", clientController.showKlientDetails);
router.get("/form-edit/:clientID", clientController.showKlientEdit);

router.post("/add", clientController.addKlient);
router.post("/form-edit", clientController.updateKlient);
router.get("/delete/:clientID", clientController.deleteKlient);

module.exports = router;
