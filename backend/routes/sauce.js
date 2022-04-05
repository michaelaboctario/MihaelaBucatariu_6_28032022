//Route Sauce
const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth'); 

const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.sauceCreate);
router.get('/', auth, sauceCtrl.getAllSauces);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
module.exports = router;