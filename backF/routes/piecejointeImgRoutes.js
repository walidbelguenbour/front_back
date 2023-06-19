const express = require('express');
const router = express.Router();
const piecejointeImgController = require('../controllers/piecejointeImgController');
const bodyParser = require('body-parser');
const multer = require('multer')


router.get("/getImgBySignalementId/:id", piecejointeImgController.getImgBySignalementId  )


// Ajouter capture 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+"-"+file.originalname);
    }
  })

  const upload = multer({
    storage: storage,
    // Limits file size to 2MB
    limits: { fileSize: 2000000 }
  });
// Ajouter une piece jointe image
router.post("/add",upload.single('path'), piecejointeImgController.addImg  )

module.exports = router;