const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerModel = new Schema({
Numerodecliente: { type: Number, required: true},
AutorizacionconsultaaBurodeCredito: { type: String, required: false },
Autorizacionusocomercial: { type: String, required: false}
},{collection:'banco'});

module.exports = mongoose.model('clientes', customerModel);