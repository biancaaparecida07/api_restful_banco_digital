const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) { //Verifica se senha foi informada.
        //Falta de credenciais. 
        return res.status(401).json({ mensagem: 'A senha do banco não foi informada!' })
    }

    if (senha_banco !== 'Cubos123Bank') { //Verifica se senha é diferente da correta.
        //Servidor rejeita resposta, pois identidade do cliente é conhecida e não tem direito de acesso.
        return res.status(403).json({ mensagem: 'A senha do banco informada é inválida!' })
    }

    if (senha_banco === 'Cubos123Bank') {
        return next();
    }
}

module.exports = { validarSenha }