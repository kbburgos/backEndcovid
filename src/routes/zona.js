const express = require("express");
const router = express.Router();
const zonaController = require("../controllers/zona");
//const { database } = require("../keys");

router.get("/", zonaController.getAll);
router.post("/add", zonaController.add);
router.get("/:id", zonaController.getId);
router.post("/update/:id", zonaController.update);
router.get("/delete/:id", zonaController.delete);

module.exports = router;
