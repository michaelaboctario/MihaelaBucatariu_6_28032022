//Route Sauce
const express = require('express');
const multer = require("../middleware/multer-config");

const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', multer, sauceCtrl.sauceCreate);
router.get('/', sauceCtrl.getAllSauces);

module.exports = router;