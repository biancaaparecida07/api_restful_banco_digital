const express = require('express');
const { listarContas, criarConta, atualizarUsuario } = require('./controllers/contas');
const { validarSenha } = require('./intermediarios');
const rotas = express();

/**--Endpoints--**/
//Listar Contas
rotas.get('/contas', validarSenha, listarContas);

//Criar Conta
rotas.post('/contas', criarConta);

//Atualiza Usuário
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario)

module.exports = rotas;