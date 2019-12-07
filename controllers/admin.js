const banco = require('../models/banco');

exports.bancoInq = function (req, res) {
    banco.find({},{_id:0,Numerodecliente:1,AutorizacionconsultaaBurodeCredito:1,Autorizacionusocomercial:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({Numerodecliente:1});
};
exports.bancoAdd = (req, res) => {
    banco = new banco({
        Numerodecliente: req.body.Numerodecliente,
        AutorizacionconsultaaBurodeCredito: req.body.AutorizacionconsultaaBurodeCredito,
        Autorizacionusocomercial: req.body.Autorizacionusocomercial     
    })
    console.log(banco);
    banco.save(function (err, banco) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(banco.Numerodecliente + " insertado en la coleccion ...");
    });
}



