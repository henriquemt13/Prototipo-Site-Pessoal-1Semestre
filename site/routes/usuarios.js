// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from Cadastrar where email='${login}' and senha='${senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.post('/cadastrar',(req, res, next) =>{
  banco.conectar().then(pool => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    var login = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var cep = req.body.cep;
    var tel = req.body.telefone;

    // if (login == undefined || senha == undefined) {
    //   throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    // }
  
    return pool.request().query(`insert into Cadastrar (email, senha, nome, endereco, cidade, estado, cep, telefone) values ('${login}', '${senha}', '${nome}', '${endereco}', '${cidade}', '${estado}', '${cep}', '${tel}')`);
  }).then(()=>{
    res.send(200);
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    banco.sql.close();
  })
});


// não mexa nesta linha!
module.exports = router;
