const express = require('express');
const router = express.Router();
const citoyenController = require('../controllers/citoyenController');

// Liste des routes pour les opérations sur les citoyens
router.get('/', citoyenController.getAllCitoyens);
router.get('/getCitoyenById:id', citoyenController.getCitoyenById);
router.post('/create', citoyenController.createCitoyen);
router.put('/update:id', citoyenController.updateCitoyen);
router.delete('/delete:id', citoyenController.deleteCitoyen);

module.exports = router;