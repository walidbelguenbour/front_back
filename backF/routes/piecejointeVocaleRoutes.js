const express = require('express');
const router = express.Router();
const piecejointeVocaleController = require('../controllers/piecejointeVocaleController');
const multer = require('multer')


router.get("/getVocaleBySignalementId/:id", piecejointeVocaleController.getVocaleBySignalementId  )


// Ajouter capture 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/vocaux')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+"-"+file.originalname);
    }
  })

// Ajouter une piece jointe image
router.post("/add",multer({storage: storage}).single('path'), piecejointeVocaleController.addVocale  )

module.exports = router;