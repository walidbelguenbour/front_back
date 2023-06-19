const express = require("express");
const router = express.Router();
const signalementController = require("../controllers/signalementController");

// Récupérer tous les signalements
router.get("/", signalementController.getAllSignalements);

// Récupérer un signalement par son ID
router.get("/getSignalementById/:id", signalementController.getSignalementById);

// Récupérer un signalement par heure
router.get("/getNumberSignalementsByHour", signalementController.getNumberSignalementsByHour);

// Récupérer un signalement par jour
router.get("/getNumberSignalementsByDay/:jour", signalementController.getNumberSignalementsByDay);

// Récupérer un signalement par moir
router.get("/getNumberSignalementsByMonth", signalementController.getNumberSignalementsByMonth);

// Récupérer un signalement par année
router.get("/getNumberSignalementsByYear", signalementController.getNumberSignalementsByYear);

// Récupérer un signalement par son statut
router.get("/getNumberSignalementsByStatut", signalementController.getNumberSignalementsByStatut);

// Récupérer un signalement par ID citoyen
router.get("/getSignalementByCitoyenId/:id", signalementController.getSignalementByCitoyenId);

// Créer un nouveau signalement
router.post("/create", signalementController.createSignalement);

// Mettre à jour un signalement
router.put("/update/:id", signalementController.updateSignalement);

// Supprimer un signalement
router.delete("/delete/:id", signalementController.deleteSignalement);

module.exports = router;
