 const { Sequelize } = require('sequelize');


 module.exports = async function () {
    const sequelize = new Sequelize('shopping', 'root', 'root', {
        'dialect': 'mysql',
        'host': "localhost",
        "port": "3306"
    });


    try {
        await sequelize.authenticate();
        console.log('Sql Connected...');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 }