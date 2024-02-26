const { DataTypes } = require('sequelize');
const sequelize =  require('../../startup/sqldb');

 const Cart =  sequelize.define('Cart', {
  // Model attributes are defined here
  CustomerId: {
    type: DataTypes.BIGINT,
    allowNull: false
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

Cart.sync();

module.exports = Cart;