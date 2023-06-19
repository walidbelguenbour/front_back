const db = require('../utils/db');
const fs = require('fs');
const path = require('path');

// Ajouter une image
exports.addImg = (req, res) => {
    var data = JSON.parse(req.body.image)
    const type = path.extname(req.file.path);
    const size = fs.statSync(req.file.path).size;
    const pathName = path.basename(req.file.path);
    db.query("INSERT INTO piecejointeimg (path, type , size ,description, signalementid) VALUES ($1, $2, $3, $4 , $5 ) RETURNING id",
    [pathName , type , size , data.description , data.signalementid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite." });
      } else {
        res.status(200).json(result.rows[0].id);
      }
    });
};


// Récupérer les pieces jointes 
exports.getImgBySignalementId = (req, res) => {
  const signalementId = req.params.id;
  db.query("SELECT id , path , description FROM piecejointeimg WHERE signalementid= $1" , [signalementId], (err, result) => {
  if (err) {
  console.log(err);
  res.status(500).json({ message: "Une erreur s'est produite." });
  } else {
  res.status(200).json(result.rows);
  }
  });
  };


