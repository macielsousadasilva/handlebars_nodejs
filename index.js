const express = require("express");
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

const app = express();


// Template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//rotas da aplicação

app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts})// Envia as variaveis do banco para a pagina
    })    
})

app.get('/formulario', function(req, res){    
    res.render('formulario')
})

app.post('/add', function(req, res){
    //req.body.conteudo
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        //res.send("Post criado com sucesso")
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro" + erro)
    })

})

app.get('/deletar/:id', function(req, res){    
    Post.destroy({
        where: {'id' : req.params.id, 'id' : req.params.id} //pode inserir varios separados por virgula
    }).then(function(){
        //res.send("Post deletada com sucesso")
        res.redirect('/')
    }).catch(function(erro){
        res.send("Essa postagem não existe")
    })

})


app.listen(8050, function(){
    console.log('Servidor Rodando')
});