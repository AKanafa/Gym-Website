const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/", locationController.showLokalizacjaList);
router.get("/add", locationController.showLokalizacjaForm);
router.get("/form-detail/:locationID", locationController.showLokalizacjaDetails);
router.get("/form-edit/:locationID", locationController.showLokalizacjaEdit);

router.post("/add", locationController.addLokalizacja);
router.post("/form-edit", locationController.updateLokalizacja);
router.get("/delete/:locationID", locationController.deleteLokalizacja);

module.exports = router;
