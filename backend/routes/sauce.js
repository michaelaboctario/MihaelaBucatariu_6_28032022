//Route Sauce
const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth'); 
const sauceCtrl = require('../controllers/sauce');

const router = express.Router();

router.post('/', auth, multer, sauceCtrl.sauceCreate);
router.get('/', auth, sauceCtrl.getAllSauces);
router.put("/:id", auth, multer, sauceCtrl.updateSauce); 
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce); 
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;