const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route pour la vérification des identifiants lors de la connexion
router.post('/login', authController.login);

module.exports = router;
