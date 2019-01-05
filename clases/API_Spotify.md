# API de Spotify

Debemos crear una cuenta en spotify y luego registrarnos como developers 

``` https://developer.spotify.com/documentation/web-api/ ```

## Usando POSTMAN

La ruta es https://accounts.spotify.com/api/token

Pasamos una Authorizacion tipo Basi Auth, donde el username es el ID y el password la llave privada
que creamos en la cuenta de developers 

En el Body como x-www-form-urlencode agregamos como Key **grant_type = client_credentials**

#### Luego.... 

Nos Vamos a la lista de reproduccion

https://api.spotify.com/v1/users/garethderioth/playlists

donde garethderioth es el usuario que estamos ingresando

y nos vamos nuevamente a Authorization, seleccionamos Bear Tokens, agregamos el token previamente 
generado y hacemos la consulta.

## Array of Scope 

https://developer.spotify.com/documentation/general/guides/scopes/