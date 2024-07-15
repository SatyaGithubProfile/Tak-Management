const express = require('express');
const router = express.Router();
const Cart = require('../../models/shopping/cart');
const lodash = require('lodash');
const sequelize = require('../../startup/sqldb');


router.post('/', async (req, res) => {
    console.log(req.body);
    const cartItem = await sequelize.query(`SELECT * FROM carts WHERE customerId= ${req.body.CustomerId} AND productId = ${req.body.ProductID}`, { type: sequelize.QueryTypes.SELECT });
    console.log('cart item --->', cartItem)
    let result = '';
    try {
        if (cartItem.length !== 0) {
            result = await sequelize.query(`UPDATE carts SET Quantity=${req.body.Quantity} WHERE CustomerId=${req.body.CustomerId} AND ProductID=${req.body.ProductID}`,
                { type: sequelize.QueryTypes.UPDATE })
        console.log('result--->', result)
            }
        else {
            result = await Cart.create(lodash.pick(req.body, ['CustomerId', 'ProductID', 'Quantity', 'NetPrice', 'Discount', 'TotalPrice']));
        }
    
    }
    catch(error) {
        console.log(error)
    }

    res.send(result);

})

router.get('/', async (req, res) => {
    const result = await Cart.findAll();
    res.send(result);
})



module.exports = router;