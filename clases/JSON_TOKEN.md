# JSON Web Tokens

Los JSON Web Tokens (JWT) son un estándar que nos permite representar los permisos o requerimientos entre dos partes, es decir, el servidor de nuestra aplicación concede los permisos para un usuario generando un token, este token se envía al cliente o navegador donde utilizamos el token para realizar peticiones al servidor sin que éste necesite verificar a los usuarios, simplemente recibe los JWT y devuelve la información a la que el usuario tiene permiso según cada token.

Los JWT se dividen en 3 cadenas de texto separadas por puntos. La primera parte es el header y contiene el algoritmo y el tipo de token que utilizamos para firmar. La segunda parte es el payload, contiene información como la identificación del usuario, fechas de creación y expiración del token, entre otras ( debemos tener cuidado de no transmitir información sensible ya que, puede ser decodificada por alguna otra aplicación). Por último, la signature es la tercera parte del token y se genera codificando los anteriores campos más una firma secreta, gracias a esta parte del token podemos verificar su autenticidad e invalidar el token si alguno de los campos cambia.

Podemos utilizar dos tipos de algoritmos para codificar nuestros tokens, los simétricos nos permiten encriptar y desencriptar los tokens utilizando una única llave privada, o podemos utilizar algoritmos asimétricos que utilizan una llave privada y una publica para tener mayor seguridad y evitar problemas si alguna de las llaves es interceptada.


https://jwt.io/

https://www.iana.org/assignments/jwt/jwt.xhtml

https://keygen.io/

# Autenticación tradicional vs JWT

La autenticación tradicional funciona creando un espacio en memoria con un id para identificar a los usuarios activos, estos IDs se almacenan en cookies (información que enviamos o modificamos entre servidores y navegadores) para identificar si los usuarios están o no autenticados. Todas las cookies tienen un tiempo límite, es decir, después de cierto tiempo la cookie se borra y la sesión termina, el usuario debe volver a autenticarse.

El problema de este tipo de autenticación es que no funciona con _Single Page Applications (aplicaciones construidas sobre una única página), ya que no refrescamos el navegador para acceder a nueva información o verificar la autenticación de los usuarios, no hay forma de acceder a las cookies a medida que los usuarios interactúan con la aplicación. También tenemos problemas cuando construimos aplicaciones con arquitecturas basadas en microservicios, cualquier control de permisos requiere volver a realizar peticiones en la base de datos.

La autenticación con tokens funciona generando tokens con la identificación y los permisos de cada usuario, estos tokens son enviados y almacenados desde el cliente, así que, siempre que nuestras aplicaciones necesitan verificar los permisos de los usuarios simplemente necesitan validar los tokens. Gracias a este tipo de autenticación NO necesitamos un servicio de backend para almacenar las sesiones de autenticación de los usuarios, solo con guardar y validar los tokens podemos controlar los permisos para cada usuario.
