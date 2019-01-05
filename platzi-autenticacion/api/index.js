// server
const express = require("express");
const bodyParser = require("body-parser");
// especifica para nodeJS, revisar jwt.io
const jwt = require("jsonwebtoken");

const request = require("request");

// por defecto agregar ./config/index.js
const { config } = require("./config");

const encodeBasic = require("./utils/encodeBasic");

const app = express();

// body parser
app.use(bodyParser.json());

function getUserPlaylists(accessToken, userId) {
  if (!accessToken || !userId) {
    return Promise.resolve(null);
  }

  const options = {
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true
  };

  return new Promise((resolve, reject) => {
    request.get(options, function(error, response, body) {
      if (error || response.statusCode !== 200) {
        reject(error);
      }

      resolve(body);
    });
  });
}





app.get("/api/playlists", async function(req, res, next) {
  const { userId } = req.query;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${encodeBasic(
        config.spotifyClientId,
        config.spotifyClientSecret
      )}`
    },
    form: {
      grant_type: "client_credentials"
    },
    json: true
  };

  request.post(authOptions, async function(error, response, body) {
    if (error || response.statusCode !== 200) {
      next(error);
    }

    const accessToken = body.access_token;
    const userPlaylists = await getUserPlaylists(accessToken, userId);
    res.json({ playlists: userPlaylists });
  });
});


// verificar token 
app.get("/api/auth/verify", function(req, res, next) {
  // obtener el access token 
  const { access_token } = req.query;
  
  try {
    // intenta decodificar
    const decoded = jwt.verify(access_token, config.authJwtSecret);
    // muestra si es valido
    res.json({ message: "Bienvenido", username: decoded.sub });
  } catch (err) {
    // manejo de error con express devuelve mensaje en formato HTML pero deberia ser JSON en  una API 
    next(err);
  }
});



// firmar token

app.post("/api/auth/token", function(req, res) {
  // recibe los datos 
  const { email, username, name } = req.body;
  // genera el token
  const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
  // devuelve el token
  res.json({ access_token: token });
});



// levantar servidor 
const server = app.listen(5000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
