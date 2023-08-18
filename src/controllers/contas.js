const bancoDeDados = require('../../database/bancodedados');

const listarContas = (req, res) => {
    if (bancoDeDados.contas.length === 0) {
        return res.status(204).json();
    }

    return res.status(200).json(bancoDeDados.contas);
};

module.exports = {
    listarContas
}