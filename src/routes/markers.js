const express = require("express");
const router = express.Router();
const markersController = require("../controllers/markers");
//const { database } = require("../keys");

router.get("/", markersController.getAll);
router.post("/add", markersController.add);
router.get("/:id", markersController.getId);
router.post("/update/:id", markersController.update);
router.get("/delete/:id", markersController.delete);

module.exports = router;
