// Isto aqui é um model - é algo que representa a minha tabela no database
const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;
