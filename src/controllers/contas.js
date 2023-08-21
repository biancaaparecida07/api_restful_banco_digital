let { contas } = require('../../database/bancodedados');
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
        numero: numConta,
        saldo: saldo,
        usuario: novaConta
    }

    //Número único.
    numConta++;

    contas.push(novaContaCadastrar);
    return res.status(200).json();

};

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    let novosDadosUsuario = req.body;

    //Validação - Existência do número da conta passado como parametro na URL
    const contaAlterar = contas.find((conta) => {
        return (contas.numero === numeroConta);
    })
    if (!contaAlterar) {
        return res.status(404).json({ message: 'O número da conta informado não existe. ' })
    }

    // Validação - CPF for informado já registrado em outra conta
    if (novosDadosUsuario.cpf || novosDadosUsuario.email) {
        const usuario = contas.find((usuario) => {
            return ((usuario.cpf === novosDadosUsuario.cpf) || (usuario.email === novosDadosUsuario.email));
        })

        if (!usuario) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }
    }
}



module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario
}