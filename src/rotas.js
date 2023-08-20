const express = require('express');
const { listarContas, criarConta } = require('./controllers/contas');
const { validarSenha } = require('./intermediarios');
const rotas = express();

/**--Endpoints--**/
//Listar Contas
rotas.get('/contas', validarSenha, listarContas);

//Criar Conta
rotas.post('/contas', criarConta);

module.exports = rotas;