const mongoose = require('mongoose');

const pas = new mongoose.Schema({
	Nome: String,
    Mensalidade: String,

});

const passageiro = mongoose.model('passageiros', pas);
module.exports = passageiro;