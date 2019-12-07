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
//crear colleccion y fijar creacion de db
db.banco.insertMany([
    {
        "Numerodecliente": 1,
        "AutorizacionconsultaaBurodeCredito": true,
        "Autorizacionusocomercial": true
    },
    {
        "Numerodecliente": 2,
        "AutorizacionconsultaaBurodeCredito": true,
        "Autorizacionusocomercial": true
    },
    {
        "Numerodecliente": 3,
        "AutorizacionconsultaaBurodeCredito": true,
        "Autorizacionusocomercial": true
    },
    {
        "Numerodecliente": 4,
        "AutorizacionconsultaaBurodeCredito": true,
        "Autorizacionusocomercial": true
    }

]);