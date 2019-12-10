
const Sequelize = require('sequelize');

//Cria os parametros de conexão com banco de dados
const sequelize = new Sequelize('db_nodejs','usuario','senha', {
    host: "192.168.64.3",//localhost
    dialect: "mariadb",
    dialectOptions: {connectTimeout: 1000}
})

//Verifica se está conectado
sequelize.authenticate().then(function(){
    console.log('Conectado')
}).catch(function(erro){
    console.log("erro "+ erro)
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}