//----------------------------------------------------------------------------------------
//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoDBUrl = require('./keys');
const Controller = require('./controllers/admin');
//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 1500;
//instruccion para heroku, la asignacion del puerto es dinamico
//var port =process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { res.send('CLOUD COMPUTING.... Porfavor use /api/banco');});
app.get('/api/banco', Controller.bancoInq);
app.post('/api/banco', Controller.bancoAdd);

//----------------------------------------------------------------------------------------
//4.- Encender webserver y dbserver
app.listen(port,()=>{
    console.log('Server Inicializado en el puerto: '+port);
    mongoose.connect(MongoDBUrl.conn, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Server mongodb Conectado...') }, err =>
         { console.log(err)});
  });
  //----------------------------------------------------------------------------------------