#Verificando nuestro JWT firmado y buenas practicas con JWT

Gracias a la librería jsonwebtokens también podemos validar nuestros JWT utilizando el método jwt.verify(), en esta clase vamos a crear un nuevo endpoint (/api/auth/verify) donde debemos devolver el el nombre de usuario que encontramos si el token que verificamos es valido. En caso de que el token no sea valido, vamos a devolver un error utilizando el método next() de la librería express.

Buenas prácticas al utilizar JWT:

* Nunca transmitir información sensible: Recuerda que los JWT son completamente decodificables, su seguridad no esta en la encripción de datos que transmitimos por los tokens sino en la validación frente a nuestros servidores. Toda la información que transmitimos por JWT debe ser tratada como si fuera enviada por texto plano.

* Mantener los tokens pequeños: Los JWT NO son un medio de transmisión de datos, su única responsabilidad es verificar la autenticación de nuestros usuarios. para obtener la información de nuestros usuarios debemos crear nuevos endpoints en la API de nuestra aplicación que, por su puesto, solo deben ser disponibles si enviamos un token valido.

* Configurar tiempos de vida de muy cortos: El tiempo de vida de nuestros tokens son el tiempo en que podemos utilizarlos, la recomendación son máximo 15 minutos. Entre más grande sea este tiempo, más tiempo tienen quienes quieran cometer ataques a nuestra aplicación.

* Crear JWT opacos: Nunca es una buena idea decodificar nuestros tokens desde el cliente o frontend de nuestra aplicación, recuerda que este código es completamente público y corremos el riesgo de que alguien más acceda a las llaves privadas de nuestra aplicación.