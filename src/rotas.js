const express = require('express');
const { listarContas, criarConta, atualizarUsuario, deletarConta, obterSaldo, obterExtrato } = require('./controllers/contas');
const { depositar, sacar, transferir } = require('./controllers/transacoes');
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

//Depositar
rotas.post('/transacoes/depositar', depositar);

//Sacar
rotas.post('/transacoes/sacar', sacar);

//Transferir
rotas.post('/transacoes/transferir', transferir);

//Obter Saldo
rotas.get('/contas/saldo', obterSaldo);

//Obter Extrato
rotas.get('/contas/extrato', obterExtrato);

module.exports = rotas;