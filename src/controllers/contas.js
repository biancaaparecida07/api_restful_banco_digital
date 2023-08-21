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
    return res.status(204).json(); //Código 204 para respostas sem conteúdo no body.

};

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    let novosDadosUsuario = req.body;

    //Validação - Existência do número da conta passado como parametro na URL
    const contaAlterar = contas.find((conta) => {
        return (conta.numero === Number(numeroConta));
    })
    if (!contaAlterar) {
        return res.status(404).json({ message: 'O número da conta informado não existe.' })
    }

    // Validação - CPF for informado já registrado em outra conta
    for (let i = 0; i < contas.length; i++) {
        if ((novosDadosUsuario.cpf === contas[i].usuario.cpf) || (novosDadosUsuario.email === contas[i].usuario.email)) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }
    }

    //Validação - Todos os campos passados no body
    if (!novosDadosUsuario.nome || !novosDadosUsuario.cpf || !novosDadosUsuario.data_nascimento || !novosDadosUsuario.telefone || !novosDadosUsuario.email || !novosDadosUsuario.senha) {
        return res.status(400).json({ message: 'Campo obrigatório não declarado ou em branco. A conta não foi criada!' })
    }

    //Atualização dos dados
    contaAlterar.usuario.nome = novosDadosUsuario.nome;
    contaAlterar.usuario.cpf = novosDadosUsuario.cpf;
    contaAlterar.usuario.data_nascimento = novosDadosUsuario.data_nascimento;
    contaAlterar.usuario.telefone = novosDadosUsuario.telefone;
    contaAlterar.usuario.email = novosDadosUsuario.email;
    contaAlterar.usuario.senha = novosDadosUsuario.senha;

    return res.status(204).json();

}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;
    //Validação - Existência do número da conta passado como parametro na URL
    const contaExcluir = contas.find((conta) => {
        return (conta.numero === Number(numeroConta));
    })
    if (!contaExcluir) {
        return res.status(404).json({ message: 'O número da conta informado não existe.' })
    }

    //Validação - Saldo zero para permitir exclusão.
    if (contaExcluir.saldo === 0) {
        contas = contas.filter((conta) => {
            return conta.numero != Number(numeroConta);
        }); //Filtrando o array de contas retirando apenas o que se deseja deletar.
    } else {
        return res.status(403).json({ message: '"A conta só pode ser removida se o saldo for zero!"' })
    }

    res.status(204).json();
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarConta
}