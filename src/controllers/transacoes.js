let { contas, depositos, saques, transferencias } = require('../../database/bancodedados');
const { format } = require('date-fns');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    //Validação - Dados disponíveis no body
    if (!numero_conta || !valor) {
        return res.status(400).json({ message: 'Os dados de número da conta e valor do depósito são obrigatórios!' })
    }

    //Validação - Existência da conta
    const contaDepositar = contas.find((conta) => {
        return (conta.numero === Number(numero_conta));
    })
    if (!contaDepositar) {
        return res.status(404).json({ message: 'O número da conta informado não existe.' })
    }

    //Validação - Valor depositado
    if (valor <= 0) {
        return res.status(403).json({ message: 'Não é permitido depósito de valor igual ou menor que zero.' })
    }
    const dataDeposito = new Date();
    const registro = {
        data: format(dataDeposito, 'yyyy-MM-dd HH:mm:ss'),
        numero_conta: numero_conta,
        valor: valor
    }

    contaDepositar.saldo += valor;
    depositos.push(registro);
    return res.status(204).json();

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    //Validação - Dados disponíveis no body
    if (!numero_conta || valor == undefined || !senha) {
        return res.status(400).json({ message: 'Os dados de número da conta, valor do depósito e senha são obrigatórios!' })
    }

    //Validação - Existência da conta
    const contaSacar = contas.find((conta) => {
        return (conta.numero === Number(numero_conta));
    })
    if (!contaSacar) {
        return res.status(404).json({ message: 'O número da conta informado não existe.' })
    }

    //Validação de senha
    if (contaSacar.usuario.senha != senha) {
        return res.status(401).json({ message: 'Senha incorreta!' });
    }

    //Validação - Valor a ser retirado
    if (valor <= 0) {
        return res.status(403).json({ message: 'Não é permitido depósito de valor igual ou menor que zero.' })
    }

    if (contaSacar.saldo < valor) {
        return res.status(403).json({ message: 'Saldo insuficiente!' });
    } else {
        contaSacar.saldo -= valor;
        const dataSaque = new Date();
        const registro = {
            data: format(dataSaque, 'yyyy-MM-dd HH:mm:ss'),
            numero_conta: numero_conta,
            valor: valor
        }
        saques.push(registro);
        return res.status(204).json();
    }
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    //Validação - Dados disponíveis no body
    if (!numero_conta_origem || !numero_conta_destino || valor == undefined || !senha) {
        return res.status(400).json({ message: 'Os dados das contas, valor e senha são obrigatórios!' })
    }

    //Validação - Existência das contas
    const contaOrigem = contas.find((conta) => {
        return (conta.numero === Number(numero_conta_origem));
    })
    if (!contaOrigem) {
        return res.status(404).json({ message: 'O número da conta informado não existe.' })
    }

    const contaDestino = contas.find((conta) => {
        return (conta.numero === Number(numero_conta_destino));
    })
    if (!contaDestino) {
        return res.status(404).json({ message: 'O número da conta informado não existe.' })
    }

    //Validação de senha - Conta de Origem
    if (contaOrigem.usuario.senha != senha) {
        return res.status(401).json({ message: 'Senha incorreta!' });
    }

    //Validação - Valor a ser retirado
    if (valor <= 0) {
        return res.status(403).json({ message: 'Não é permitido depósito de valor igual ou menor que zero.' })
    }

    if (contaOrigem.saldo < valor) {
        return res.status(403).json({ message: 'Saldo insuficiente!' });
    } else {
        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
        const dataTransf = new Date();
        const registro = {
            data: format(dataTransf, 'yyyy-MM-dd HH:mm:ss'),
            numero_conta_origem: numero_conta_origem,
            numero_conta_destino: numero_conta_destino,
            valor: valor
        }
        transferencias.push(registro);
        return res.status(204).json();
    }
}

module.exports = {
    depositar,
    sacar,
    transferir
}