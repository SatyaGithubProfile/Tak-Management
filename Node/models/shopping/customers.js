const { DataTypes } = require('sequelize');
const sequelize = require('../../startup/sqldb');
const Joi = require('joi')

const Customers = sequelize.define('Customers', {
    // Model attributes are defined here
    CustomerId: {
        type: DataTypes.INTEGER(100),
        autoIncrement: true,
        primaryKey: true

    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        allowNull: false,
        unique: true
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
Customers.sync({ force: false, alter: true }).then(() => {
    console.log('Customers table created!');
    sequelize.query('ALTER TABLE Customers AUTO_INCREMENT = 100;');
}).catch(err => {
    console.error('Error syncing CUSTOMERS table:', err);
});


function validateTask(customer) {
    const schema = Joi.object({
        Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        Password: Joi.string().min(5).max(10).required(),
        FirstName: Joi.string().min(3).max(10).required(),
        LastName: Joi.string().min(3).max(10).required(),
        FirstName: Joi.string().min(3).max(10).required(),
        MobileNumber: Joi.number().max(9999999999).required(),
        Address: Joi.string().min(3).max(25).required(),
        Pincode: Joi.number().max(1000000).required()
    });
    return schema.validate(customer);
}
module.exports.Customers = Customers;
module.exports.validate = validateTask;