const express = require('express');
const { listarContas, criarConta, atualizarUsuario, deletarConta } = require('./controllers/contas');
const { validarSenha } = require('./intermediarios');
const rotas = express();

/**--Endpoints--**/
//Listar Contas
rotas.get('/contas', validarSenha, listarContas);

//Criar Conta
rotas.post('/contas', criarConta);

//Atualiza Usuário
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);

//Excluir Conta
rotas.delete('/contas/:numeroConta', deletarConta);

module.exports = rotas;