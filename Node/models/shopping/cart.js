const { DataTypes } = require('sequelize');
const sequelize =  require('../../startup/sqldb');

 const Cart =  sequelize.define('Cart', {
  // Model attributes are defined here
  CartID : {
    type: DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement : true,
  
  },
  CustomerId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  ProductID: {
    type: DataTypes.BIGINT,
    allowNull : false
  },
  Quantity: {
    type: DataTypes.BIGINT,
    allowNull : false
  },
  NetPrice: {
    type: DataTypes.BIGINT,
    allowNull : false
  },
  Discount: {
    type: DataTypes.BIGINT,
    allowNull : false
  },
  TotalPrice: {
    type: DataTypes.BIGINT,
    allowNull : false
  }
}, {
    define: {
        freezeTableName: true
      }
});

Cart.sync({force : false});

module.exports = Cart;