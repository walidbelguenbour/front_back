const express = require('express');
const router = express.Router();
const enfantController = require('../controllers/enfantController');

// Récupérer la liste des enfants
router.get('/', enfantController.getEnfants);

// Récupérer un enfant par son id
router.get('/getEnfantById:id', enfantController.getEnfantById);

// Ajouter un enfant
router.post('/create', enfantController.createEnfant);

// Modifier un enfant
router.put('/update/:id', enfantController.updateEnfant);

// Supprimer un enfant
router.delete('/delete/:id', enfantController.deleteEnfant);

module.exports = router;