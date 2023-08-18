const express = require('express');
const { listarContas } = require('./controllers/contas');
const { validarSenha } = require('./intermediarios');
const rotas = express();


rotas.get('/contas', validarSenha, listarContas);
module.exports = rotas;