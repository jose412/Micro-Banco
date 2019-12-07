# Microservici-Banco

_Implementación con Node Js, Express, MVC, con acceso authenticado_

### Pre-requisitos 📋

_Que cosas necesitarás_

```
Framework Node Js

Docker
Editor de código (Visual Code)
Git
Postman
Cuenta en GitHub
```
### Crear estructura del proyecto

_Estructura general inicial_

```
apiclientes
    controllers
      admin.js
    models
      banco.js
    app.js
    keys.js

```

_cadena de conexion,considerando el usuario y password_

```javascript
const DbConnection='mongodb://apiuser:apipassword@mongoserver:27017/banco';
```
_API get_

```javascript
app.get('/api/banco', Controller.bancoInq);
```
_API post_

```javascript
app.post('/api/banco', Controller.bancoAdd);
```

_En el controller el archivo admin.js, estarán las funciones_

```javascript
const banco = require('../models/banco');

exports.bancoInq = function (req, res) {
    banco.find({},{_id:0,id_cliente:1,Numerodecliente:1,AutorizacionconsultaaBurodeCredito:1,Autorizacionusocomercial:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({cliente:1});
};
exports.bancoAdd = (req, res) => {
    Buro = new  banco({
        Numerodecliente: req.body.cliente,
        AutorizacionconsultaaBurodeCredito: req.body.direccion,
        Autorizacionusocomercial: req.body.telefono     
    })
    console.log(Buro);
    Buro.save(function (err, Buro) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(Buro.Numerodecliente + " insertado en la coleccion ...");
    });
}


```

### Crear el archivo de inicio de la bd

_Estructura mongo-init.js_

```javascript
//crear el usuario de servicio
db.createUser({
    user:"apiuser",
    pwd:"apipassword",
    roles:[
        {
            role:"readWrite",
            db:"banco"
        }
        
    ]
});
//heredar acceso de lectura escritura
db.grantRolesToUser( "apiuser", [ "readWrite" ] );
//habilitar uso desde shell y cadena de conexion
db.auth('apiuser', 'apipassword');
//crear la bd
db = db.getSiblingDB('banco');
//crear colleccion y fijar creacion de bd
db.banco.insertMany([{
    Numerodecliente:"1",
AutorizacionconsultaaBurodeCredito:true,
Autorizacionusocomercial:true
},
{
    Numerodecliente:"2",
AutorizacionconsultaaBurodeCredito:true,
Autorizacionusocomercial:true
},
{
    Numerodecliente:"3",
AutorizacionconsultaaBurodeCredito:true,
Autorizacionusocomercial:true
}])

```

_Resumen de creación_

> * Crear el código de controller
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar el servicio
> * Editar el package.json en la línea script: "start":"node app.js"
> * Crear el archivo mongo-init.js para usuarios y carga de datos inicial
> * Crear el archivo docker-compose.yml con las instrucciones de armado


_Crear Dockerfile_

```Dockerfile
FROM  node:9-slim
RUN mkdir /src
WORKDIR /src
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 6000
CMD ["npm","start"]
```

_Crear .dockerignore para no considerar la carpeta librerías (drivers)_

```
node_modules
```

### Orquestar los servicios 🔩

_Una vez creadas las imagenes con los servicios validados, los vamos a orquestar_

_Resumen_

> * Crear el docker-compose.yml, instrucciones de armado de los contenedores
> * Corer el docker-compose.yml
> * Validar la existencia de los contenedores
> * Validar los logs de cada contenedor si están encendidos
> * Revisar los logs después de cada operación de los contenedores involucrados

_Crear docker-compose.yml al nivel del proyecto_

```
apiclientes
    controllers
      admin.js
    models
      banco.js
    app.js
    keys.js
    mongo-init.js
    package.json
    Dockerfile
    .dockerignore
    docker-compose.yml
```

```yml
version: '3'

#Declarar los servicios
#depends_on para ligar conexion entre contenedores
#environment instrucciones para el uso de bd, usuario y pass
# adicionalamente para cargar archivo de inicializacion mongo-init.js
# en settings de docker en la pestaña share drives debe estar habilitado el drive
# de no hacerlo marca error de drive no compartido
services:
  catclientes:
    container_name: banco
    image: banco
    build: .
    ports:
      - '6000:6000' 
    networks:
      - domain.parties 
    depends_on:
      - database
  database:
    container_name: mongoserver
    image: mongo
    environment:
      - MONGO_INITDB_DATABASE=banco
      - MONGO_INITDB_ROOT_USERNAME=apiuser
      - MONGO_INITDB_ROOT_PASSWORD=apipassword
    volumes:
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    ports:
      - '27017:27017'
    networks:
      - domain.banco 
networks:
  domain.parties:
    external: true  

```
_Crear la red domain.parties antes correr el compose_

```Dockerfile
docker network create domain.banco
```

_Crear los contenedores al correo yml_

```Dockerfile
docker-compose up -d
```

_Validar la creación_

```Dockerfile
docker ps
```

## Autor ✒️

* **Jose Barron** - *Versión Inicial* - [jose412](https://github.com/jose412/)



