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

    //Definição de saldo inicial 0
    const saldo = 0;

    //Validação - Campos obrigatórios declarados e preenchidos no body
    if (!novaConta.nome || !novaConta.cpf || !novaConta.data_nascimento || !novaConta.telefone || !novaConta.email || !novaConta.senha) {
        return res.status(400).json({ message: 'Campo obrigatório não declarado ou em branco. A conta não foi criada!' })
    }

    //Validação CPF e email únicos
    for (let i = 0; i < contas.length; i++) {
        if ((novaConta.cpf === contas[i].usuario.cpf) || (novaConta.email === contas[i].usuario.email)) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }
    }

    const novaContaCadastrar = {
        numConta: numConta,
        saldo: saldo,
        usuario: novaConta
    }

    //Número único.
    numConta++;

    contas.push(novaContaCadastrar);
    return res.status(200).json();

};

module.exports = {
    listarContas,
    criarConta
}