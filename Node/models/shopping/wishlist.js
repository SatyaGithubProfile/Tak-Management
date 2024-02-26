const { DataTypes } = require('sequelize');
const sequelize =  require('../../startup/sqldb');

 const Wishlist =  sequelize.define('Wishlist', {
  // Model attributes are defined here
  Id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement : true,
    primaryKey : true
  },
  CustomerId: {
    type: DataTypes.BIGINT,
    allowNull : false,
    unique : true
  },
  ProductIDs: {
    type: DataTypes.STRING(500),
    allowNull : false
  },

}, {
    define: {
        freezeTableName: true
      }
});

Wishlist.sync({ alter: true }).then(() => {
    console.log('WishList table created!')
},
(error) => console.log('Error while creating the WISHLIST  Table', error));

module.exports = Wishlist;