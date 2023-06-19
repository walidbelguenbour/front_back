const express = require('express');
const router = express.Router();
const piecejointeVideoController = require('../controllers/piecejointeVideoController');
const multer = require('multer')

router.get("/getVideoBySignalementId/:id", piecejointeVideoController.getVideoBySignalementId  )


// Ajouter capture 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/videos')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+"-"+file.originalname);
    }
  })

// Ajouter une piece jointe image
router.post("/add",multer({storage: storage}).single('path'), piecejointeVideoController.addVideo  )

module.exports = router;