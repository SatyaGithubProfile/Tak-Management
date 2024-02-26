 const { Sequelize } = require('sequelize');
//  const sequelize = new Sequelize('sqlite::memory:');


  const sequelize = new Sequelize('shopping', 'root', 'root', {
        'dialect': 'mysql',
        'host': "localhost",
        "port": "3306"
    });

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Sql Connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test();

 
  module.exports = sequelize;