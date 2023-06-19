const db = require('../utils/db');

// Récupérer tous les signalements
exports.getAllSignalements = (req, res) => {
  db.query("SELECT id , date , enfantid , citoyenid , statut ,  descriptif , identitesecrete , m.designationar as motif FROM signalement s LEFT Join signalementmotif m on s.motifid= m.code ", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

// Récupérer signalement par heure
exports.getNumberSignalementsByHour = (req, res) => {
  db.query("SELECT EXTRACT(hour from heure) as hour, COUNT(*) AS signalement FROM signalement GROUP BY hour", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

exports.getNumberSignalementsByDay = (req, res) => {
  const jour = req.params.jour; // Supposons que vous passiez le jour en tant que paramètre dans l'URL
  const statut = req.query.statut;

  db.query(
    `SELECT EXTRACT(DAY FROM date) AS day, statut, COUNT(*) AS signalement
    FROM signalement
    WHERE date >= $1::date AND date < ($1::date + INTERVAL '1 day') AND statut = $2
    GROUP BY day, statut;`,
    [jour, statut], // Fournit les valeurs de jour et de statut comme paramètres
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite.", error: err.message });
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
};




// Récupérer signalement par mois
exports.getNumberSignalementsByMonth = (req, res) => {
  db.query("SELECT EXTRACT(MONTH FROM date) AS month, statut, COUNT(*) AS signalement FROM signalement WHERE date >= DATE_TRUNC('month', $1::date) AND date < (DATE_TRUNC('month', $1::date) + INTERVAL '1 month') AND statut = $2 GROUP BY month, statut;", 
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

// Récupérer signalement par année
exports.getNumberSignalementsByYear = (req, res) => {
  db.query("SELECT EXTRACT(YEAR FROM date) AS year, statut, COUNT(*) AS signalement FROM signalement WHERE date >= DATE_TRUNC('year', $1::date) AND date < (DATE_TRUNC('year', $1::date) + INTERVAL '1 year') AND statut = $2 GROUP BY year, statut;", 
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

// Récupérer un signalement par son ID
exports.getSignalementById = (req, res) => {
  const signalementId = req.params.id;
  db.query("SELECT id , date , citoyenid, enfantid  ,  descriptif , identitesecrete ,  m.designationar as motif  FROM signalement s LEFT Join signalementmotif m on s.motifid= m.code  WHERE id = $1", [signalementId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else if (result.rows.length === 0) {
      res.status(404).json({ message: "Signalement introuvable." });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
};


exports.getSignalementByCitoyenId = (req, res) => {
  const citoyenId = req.params.id;
  db.query("SELECT s.id, s.descriptif, s.statut, m.designationar, e.nom, e.prenom, e.adresse, e.age, e.sexe, e.situationparent, w.namear FROM signalement s join enfant e ON s.enfantid=e.id join wilaya w ON e.wilayacode=w.code join signalementmotif m ON m.code=s.motifid WHERE s.citoyenid = $1", [citoyenId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else if (result.rows.length === 0) {
      res.status(404).json({ message: "Signalement introuvable." });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

// Créer un nouveau signalement
exports.createSignalement = (req, res) => {
  const { id , citoyenid, motifid, enfantid  ,  descriptif, preuveid , typesignaleurid , identitesecrete} = req.body;
  db.query("INSERT INTO signalement (citoyenid, motifid, enfantid  ,  descriptif, preuveid , typesignaleurid, identitesecrete , date , heure) VALUES ($1, $2, $3, $4 , $5 ,$6 , $7 , NOW() , NOW()) RETURNING id",
    [citoyenid, motifid, enfantid  ,  descriptif, preuveid , typesignaleurid, identitesecrete ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite." });
      } else {
        res.status(201).json(result.rows[0].id);
      }
    });
};

// Mettre à jour un signalement
exports.updateSignalement = (req, res) => {
  const signalementId = req.params.id;
  const { citoyen_id, motif_id, description, image } = req.body;
  db.query("UPDATE signalement SET citoyen_id = $1, motif_id = $2, description = $3, image = $4 WHERE id = $5 RETURNING *",
    [citoyen_id, motif_id, description, image, signalementId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite." });
      } else if (result.rows.length === 0) {
        res.status(404).json({ message: "Signalement introuvable." });
      } else {
        res.status(200).json(result.rows[0]);
      }
    });
};

// Supprimer un signalement
exports.deleteSignalement = (req, res) => {
  const signalementId = req.params.id;
  db.query("DELETE FROM signalement WHERE id = $1 RETURNING *", [signalementId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else if (result.rows.length === 0) {
      res.status(404).json({ message: "Signalement introuvable." });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
};

// Récupérer signalement par status
exports.getNumberSignalementsByStatut = (req, res) => {
  const statut = req.params.statut;
  db.query("SELECT statut ,  COUNT(*) AS nombre_signalements FROM signalement GROUP BY statut;" ,  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Une erreur s'est produite." });
    } else {
      res.status(200).json(result.rows);
    }
  });
};
