const { DataTypes } = require('sequelize');
const sequelize = require('../../startup/sqldb');

const Customers = sequelize.define('Customers', {
    // Model attributes are defined here
    CustomerId: {
        type: DataTypes.INTEGER(100),
        autoIncrement: true,
        primaryKey: true

    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MobileNumber: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IsAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    define: {
        freezeTableName: true
    }
});

// Customers.sync();


// Sync the model with the database
Customers.sync({ force: false }).then(() => {
    console.log('Customers table created!');
    sequelize.query('ALTER TABLE Customers AUTO_INCREMENT = 100;');
  }).catch(err => {
    console.error('Error syncing CUSTOMERS table:', err);
  });

module.exports = Customers;