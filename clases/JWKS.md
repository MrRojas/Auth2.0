# Profundizando el concepto de JWKS

HS256 y R256 son dos de los algoritmos soportados para firmar JSON Web Tokens. El algoritmo HS256 genera una firma simetrica, esto quiere decir el secret/key se usa tanto para el firmado como para la verificacion de la firma. Mientras que, el algoritmo RS256 genera una firma asimetrica y en este caso es una llave privada la que se usa para el firmado y una llave publica es la que se ua para verificar la firma.

#### JWK es una especificación para representar las llaves criptograficas que se usan en el firmado de token usando RS256.

## La especificación define dos estructuras de datos de alto nivel: JSON Web Key (JWK) y JSON Web key Set (JWKS).

* JSON Web Key (JWK): Un objeto JSON que representa una llave criptografica. Las propiedades del objeto representan propiedades de la llave incluyendo su valor.

* JSON Web key Set (JWKS): Un objeto JSON que representa un conjunto de JWKs. El objeto JSON debe tener una propiedad llamada keys que es la lista de JWKs.

Al nivel más basico el JWKS contiene las llaves publicas que deberian ser usadas para verificar un JWT generado por el Authorization Server.

##### Este es un ejemplo de como la respuesta de un endpoint que expone los JWKS:

```
{
  "keys": [
    {
      "alg": "RS256",
      "kty": "RSA",
      "use": "sig",
      "x5c": [
        "MIIC+DCCAeCgAwIBAgIJBIGjYW6hFpn2MA0GCSqGSIb3DQEBBQUAMCMxITAfBgNVBAMTGGN1c3RvbWVyLWRlbW9zLmF1dGgwLmNvbTAeFw0xNjExMjIyMjIyMDVaFw0zMDA4MDEyMjIyMDVaMCMxITAfBgNVBAMTGGN1c3RvbWVyLWRlbW9zLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMnjZc5bm/eGIHq09N9HKHahM7Y31P0ul+A2wwP4lSpIwFrWHzxw88/7Dwk9QMc+orGXX95R6av4GF+Es/nG3uK45ooMVMa/hYCh0Mtx3gnSuoTavQEkLzCvSwTqVwzZ+5noukWVqJuMKNwjL77GNcPLY7Xy2/skMCT5bR8UoWaufooQvYq6SyPcRAU4BtdquZRiBT4U5f+4pwNTxSvey7ki50yc1tG49Per/0zA4O6Tlpv8x7Red6m1bCNHt7+Z5nSl3RX/QYyAEUX1a28VcYmR41Osy+o2OUCXYdUAphDaHo4/8rbKTJhlu8jEcc1KoMXAKjgaVZtG/v5ltx6AXY0CAwEAAaMvMC0wDAYDVR0TBAUwAwEB/zAdBgNVHQ4EFgQUQxFG602h1cG+pnyvJoy9pGJJoCswDQYJKoZIhvcNAQEFBQADggEBAGvtCbzGNBUJPLICth3mLsX0Z4z8T8iu4tyoiuAshP/Ry/ZBnFnXmhD8vwgMZ2lTgUWwlrvlgN+fAtYKnwFO2G3BOCFw96Nm8So9sjTda9CCZ3dhoH57F/hVMBB0K6xhklAc0b5ZxUpCIN92v/w+xZoz1XQBHe8ZbRHaP1HpRM4M7DJk2G5cgUCyu3UBvYS41sHvzrxQ3z7vIePRA4WF4bEkfX12gvny0RsPkrbVMXX1Rj9t6V7QXrbPYBAO+43JvDGYawxYVvLhz+BJ45x50GFQmHszfY3BR9TPK8xmMmQwtIvLu1PMttNCs7niCYkSiUv2sc2mlq1i3IashGkkgmo="
      ],
      "n": "yeNlzlub94YgerT030codqEztjfU_S6X4DbDA_iVKkjAWtYfPHDzz_sPCT1Axz6isZdf3lHpq_gYX4Sz-cbe4rjmigxUxr-FgKHQy3HeCdK6hNq9ASQvMK9LBOpXDNn7mei6RZWom4wo3CMvvsY1w8tjtfLb-yQwJPltHxShZq5-ihC9irpLI9xEBTgG12q5lGIFPhTl_7inA1PFK97LuSLnTJzW0bj096v_TMDg7pOWm_zHtF53qbVsI0e3v5nmdKXdFf9BjIARRfVrbxVxiZHjU6zL6jY5QJdh1QCmENoejj_ytspMmGW7yMRxzUqgxcAqOBpVm0b-_mW3HoBdjQ",
      "e": "AQAB",
      "kid": "NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qg",
      "x5t": "NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qg"
    }
  ]
}
```

##Cada una de las propiedades definida en cada JWK hacer parte de la especificiación RFC 7517 Section 4 estos son algunos de los significados de las propiedades:

* alg: es el algorimot de la llave
* kty: es el tipo de llave.
* use: es como la llave será usada. En el ejemplo anterior significa que sera usado como una firma.
* x5c: es la cadena de certificado x509.
* kid: es un identificaro unico de la llave.

## Verificando un JWT usando un endpoint JWKs

Para verificar un JWT usando JWKS estos son los pasos a grandes rasgos que se deben seguir:

* Obtener los JWKS del endpoint y filtrar las pontenciales keys de firmado.
* Extraer el JWT del header del request de autorización.
* Decodificar el JWT y obtener la propiedad kid del header.
* Encontrar la llave de firmado filtrada de los JWKS usando la propiedad kid.
* usar la propiedad x5cpara construir un certificado que es el que posteriormente se podra usar para verificar la firma del JWT.
* Generalmente estos pasos se hace usando alguna libreria que lo haga por nosotros.

#### Aquí tenemos un ejemplo de como implementar la lectura y verificación de un JWT usando JWKS en un servidor con Express.js:

```
const express = require("express");
const app = express();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const port = process.env.PORT || 8080;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "/.well-known/jwks.json"
  }),
  audience: "",
  issuer: "",
  algorithms: ["RS256"]
});

app.use(jwtCheck);

app.get("/authorized", function(req, res) {
  res.send("Secured Resource");
});

app.listen(port);

```

## 4.  JSON Web Key (JWK) Format

   A JWK is a JSON object that represents a cryptographic key.  The
   members of the object represent properties of the key, including its
   value.  This JSON object MAY contain whitespace and/or line breaks
   before or after any JSON values or structural characters, in
   accordance with Section 2 of RFC 7159 [RFC7159].  This document
   defines the key parameters that are not algorithm specific and, thus,
   common to many keys.

   In addition to the common parameters, each JWK will have members that
   are key type specific.  These members represent the parameters of the
   key.  Section 6 of the JSON Web Algorithms (JWA) [JWA] specification
   defines multiple kinds of cryptographic keys and their associated
   members.

   The member names within a JWK MUST be unique; JWK parsers MUST either
   reject JWKs with duplicate member names or use a JSON parser that
   returns only the lexically last duplicate member name, as specified
   in Section 15.12 (The JSON Object) of ECMAScript 5.1 [ECMAScript].

   Additional members can be present in the JWK; if not understood by
   implementations encountering them, they MUST be ignored.  Member
   names used for representing key parameters for different keys types
   need not be distinct.  Any new member name should either be
   registered in the IANA "JSON Web Key Parameters" registry established
   by Section 8.1 or be a value that contains a Collision-Resistant
   Name.