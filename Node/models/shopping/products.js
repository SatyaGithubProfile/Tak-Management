const { DataTypes } = require('sequelize');
const sequelize = require('../../startup/sqldb');

const Products = sequelize.define('Products', {
    // Model attributes are defined here
    ProductID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Price: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    Discount: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ImageURL: {
        type: DataTypes.STRING,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Stock: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    define: {
        freezeTableName: true
    }
});

Products.sync({force:true}).then((result) => console.log('PROODUCTS Table created!'), (error) => console.log("PRODUCTS table creation Error-->", error)); 

module.exports = Products;