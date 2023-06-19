const express = require('express');
const router = express.Router();
const signalementMotifController = require('../controllers/signalementMotifController');

// Récupérer la liste des motifs de signalement
router.get('/', signalementMotifController.getAllMotifs);

// Récupérer un motif de signalement par son code
router.get('/getSignalementMotifById/:code', signalementMotifController.getMotifByCode);

// Ajouter un nouveau motif de signalement
router.post('/create', signalementMotifController.addMotif);

module.exports = router;
