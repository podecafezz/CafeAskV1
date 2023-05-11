const Sequelize = require('sequelize');

const connection = new Sequelize('cafeask','root','Cafe@123',{
    host: 'localhost',
    dialect: 'mysql',
});


module.exports = connection;