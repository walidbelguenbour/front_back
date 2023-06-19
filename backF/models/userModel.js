const pool = require('../utils/db');

const userModel = {};

userModel.findByEmailAndPassword = async (email, password) => {
  const query = 'SELECT * FROM utilisateurs WHERE email = $1 AND mot_de_passe = $2';
  const values = [email, password];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    return user || null;
  } catch (err) {
    throw err;
  }
};

module.exports = userModel;
