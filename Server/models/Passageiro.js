const mongoose = require('mongoose');

const pas = new mongoose.Schema({
	Nome: String,
    CPF: String,
    RG: String,
    DataNascimento: Date,
    Estadocivil: String,
    Contato: String,
    Email: String,
    CEP: { type: Number, default: 0 },
    Rua: String,
    Bairro: String,
    Numero: { type: Number, default: 0 },
    Complemento: String,
    Contrato: String,
});

const passageiro = mongoose.model('passageiros', pas);
module.exports = passageiro;