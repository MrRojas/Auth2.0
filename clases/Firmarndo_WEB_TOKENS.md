# Firmando un JWT
Para generar y firmar un JWT de manera simétrica vamos a instalar las siguientes dependencias:

```npm i -S express dotenv jsonwebtoken body-parser

La librería dotenv nos permite crear archivos .env con la información que no podemos publicar de nuestro proyecto, por ejemplo, la llave secreta de nuestro JWT. Por otra parte, la librería jsonwebtoken nos permite firmar nuestros tokens de manera simétrica.

Con nuestras dependencias instaladas y los archivos .env configurados, podemos programar nuestra aplicación, en esta clase vamos a crear un endpoint /api/auth/token donde debemos generar un token de usuario utilizando el método jwt.sign().