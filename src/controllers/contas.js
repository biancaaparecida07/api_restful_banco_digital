const bancoDeDados = require('../../database/bancodedados');
let { contas } = require('../../database/bancodedados')
let numConta = 1;

const listarContas = (req, res) => {
    if (contas.length === 0) {
        return res.status(204).json();
    }

    return res.status(200).json(contas);
};

const criarConta = (req, res) => {
    const novaConta = req.body;
    const saldo = 0;

    if (!novaConta.nome || !novaConta.cpf || !novaConta.data_nascimento || !novaConta.telefone || !novaConta.email || !novaConta.senha) {
        return res.status(400).json({ message: 'Campo obrigatório não preenchido. A conta não foi criada!' })
    }
    const novaContaCadastrar = {
        numConta: numConta,
        saldo: saldo,
        usuario: novaConta
    }
    numConta++;

    contas.push(novaContaCadastrar);
    return res.status(200).json();

};

module.exports = {
    listarContas,
    criarConta
}