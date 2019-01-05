# Server-Side vs Client-Side sessions
Autenticar usuarios desde de lado del servidor es considerado stateful, debemos utilizar sesiones para preservar los estados de autenticación, es decir, guardamos en memoria o en una base de datos un identificador que nos permita comprobar si los usuarios están o no autenticados.

Por otro lado, la autenticación de lado del cliente no utiliza sesiones, en realidad, no tenemos forma de verificar si los usuarios están autenticados o no, en vez de esto, validamos los datos de usuario para obtener tokens (con límite de tiempo) que utilizamos en las peticiones al servidor para validar el acceso y consultar nuestra información.

## Proceso de autenticación de lado del cliente:

Cuando los usuarios hacen login, el servidor responde con un token (indicando que el login fue exitoso) y nosotros, de lado del cliente, agregamos una bandera para indicar que el usuario esta autenticado.
En cualquier punto de nuestra aplicación (por ejemplo, cuando cambiamos de ruta o hacemos una nueva petición) debemos verificar la expiración de los tokens.
Si el token expira, debemos cambiar la bandera para indicar que el usuario NO esta autenticado y nuevamente redireccionar a los usuarios a la ruta de login.

### Notas de la clase:

* Las sesiones del lado del servidor funcionan almacenando un indicador en memoria o en la base de datos, cuando este indicador desaparece, significa que el usuario ya NO esta autenticado
 
* Estos indicadores viajan (normalmente) a través de cookies, el servidor lo envia al navegador y el navegador lo envía de vuelta al servidor 

* Del lado del cliente NO utilizamos sesiones 

* En Single Page Applications NO tenemos forma de verificar la autenticación de los usuarios, tendríamos que refrescar la página cada vez que necesitamos nueva información y básicamente se pierde el chiste, así no funcionan estas aplicaciones 

* En vez de sesiones utilizamos tokens, enviamos los datos de autenticación de nuestros usuarios al servidor y, si los datos son correctos, el servidor devuelve un token, una llave que nos da acceso por algún tiempo a la información autorizada de los usuarios

* Si en alguna de las peticiones al servidor nos informan que el token ha expirado pos, volvemos a hacer login y seguimos como si nada