const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get("/", registerController.showRejestracjaList);
router.get("/add", registerController.showRejestracjaForm);
router.get("/form-detail/:registerId", registerController.showRejestracjaDetails);
router.get("/form-edit/:registerId", registerController.showRejestracjaEdit);

router.post("/add", registerController.addRejestracje);
router.post("/form-edit", registerController.updateRejestracje);
router.get("/delete/:registerId", registerController.deleteRejestracje);

module.exports = router;
