// Encode usuario y password como se hace en Postman
function encodeBasic(username, password) {

  return Buffer.from(`${username}:${password}`).toString("base64");
}

module.exports = encodeBasic;
