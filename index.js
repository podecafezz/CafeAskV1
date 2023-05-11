const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta"); 
const Resposta= require("./database/Resposta");

//Bancodedados

connection
    .authenticate()
    .then(() => {
      console.log("Banco de dados: Okey")
    })
    .catch((msgErro) => {
      console.log("Banco de dados: Erro")
    })


// Aqui pede para ele exibir como engineview o EJS
app.set("view engine", "ejs");
app.use(express.static('public'));
// Boddy Parser - Captura de dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order:[
    ['id','DESC'] //exibir as perguntas em ordem decrescente
  ]}).then(perguntas =>{
    res.render("index", {
      perguntas: perguntas
    });

  });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  })
});

app.get("/pergunta/:id",(req ,res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta =>{
    if(pergunta != undefined){//pergunta encontrada
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order:[
          ['id','DESC']
        ]
      }).then(respostas => {
        res.render("pergunta",{
          pergunta: pergunta,
          respostas: respostas
        });
      });
    }else{ //pergunta nao encontrada 
      res.redirect("/");
    }
  });
})

//responder a pergunta
app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect("/pergunta/"+perguntaId);
  });
});

//para saber se iniciou o servidor
app.listen(8080, () => {
  console.log("Startou mizera!!!!!");
});
