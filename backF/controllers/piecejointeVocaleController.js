const db = require('../utils/db');
const fs = require('fs');
const path = require('path');


// Ajouter un vocale
exports.addVocale = (req, res) => {
    const data = JSON.parse(req.body.vocal)
    const type = path.extname(req.file.path);
    const size = fs.statSync(req.file.path).size;
    const pathName = path.basename(req.file.path);
    db.query("INSERT INTO piecejointevocale (path, type , size ,description, signalementid) VALUES ($1, $2, $3, $4 , $5 ) RETURNING id",
    [pathName , type , size , data.description , data.signalementid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite." });
      } else {
        res.status(201).json(result.rows[0].id);
      }
    });
};

// recuperer les pieces jointes d'un signalement donnée
exports.getVocaleBySignalementId = (req, res) => {
    const signalementId = req.params.id;
    db.query("SELECT id , path , description FROM piecejointevocale WHERE signalementid= $1" , [signalementId], (err, result) => {
    if (err) {
    console.log(err);
    res.status(500).json({ message: "Une erreur s'est produite." });
    } else {
    res.status(200).json(result.rows);
    }
  });
};
