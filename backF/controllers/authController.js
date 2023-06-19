const userModel = require('../models/userModel');

const authController = {};

authController.login = async (req, res) => {
  const { email, password } = req.body; // Utilisation de "password" au lieu de "mot_de_passe"

  try {
    // Vérification des identifiants en appelant la méthode du modèle approprié
    const user = await userModel.findByEmailAndPassword(email, password);

    if (user) {
      // Identifiants valides
      res.status(200).json({ message: 'Authentification réussie' });
    } else {
      // Identifiants invalides
      res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
    }
  } catch (err) {
    console.error('Erreur lors de la vérification des identifiants :', err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

module.exports = authController;
