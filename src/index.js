const porta = 3000;
const express = require('express');
const rotas = require('./rotas');

const app = express();


app.use(express.json()); //middleware nativo express para transação de informação no formato json

app.use(rotas);
app.listen(porta);