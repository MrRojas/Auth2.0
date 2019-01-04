// Lee el archivo env
require("dotenv").config();

// configurar el archivp
const config = {
  authJwtSecret: process.env.AUTH_JWT_SECRET,
 // spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  // spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET
};

// Exportamos
module.exports = { config: config };
