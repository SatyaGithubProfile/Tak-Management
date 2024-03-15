const express = require('express');
const router = express.Router();
const Product = require('../../models/shopping/products');
const lodash = require('lodash');
const response = require('../../models/response');
const sequelize = require('../../startup/sqldb');


router.post('/', async (req, res) => {
    console.log('product from frontend--->', req.body)
   let result = await Product.create(lodash.pick(req.body, ['ProductName','Price','Discount','ImageURL','Category','Description','Stock'] ));
   result['WishList'] = "FALSE";
   console.log('result--->',result)
   res.send(response(200, 'Success', result, 1));

})

router.get('/', async (req, res) => {
    // const result = await Product.findAll();

    // SELECT p.*, COALESCE(c.quantity, 0) AS cart_quantity FROM products p LEFT JOIN cart c ON p.product_id = c.product_id AND c.customer_id = ?
    // SELECT p.*, COALESCE(c.quantity, 0) AS cart_quantity FROM products p LEFT JOIN (SELECT product_id, quantity FROM cart    WHERE customer_id = ?) c ON p.product_id = c.product_id;
    // ' SELECT p.*, COALESCE(c.quantity, 0) AS Quantity  FROM products p LEFT JOIN (SELECT productId, quantity FROM carts WHERE customerID = 100) c ON p.productId = c.productId'
    const customerId = req.params.customerId || 100;
    const query = ` SELECT p.*, CAST(COALESCE(SUM(c.Quantity), 0) AS UNSIGNED) AS CartQuantity, 
    IF(SUM(w.productids) > 0, 'TRUE', 'FALSE')  AS WishList FROM products p
    LEFT JOIN carts c ON p.ProductId = c.ProductID AND c.customerId = ${customerId} LEFT JOIN wishlists w ON FIND_IN_SET(p.productId, w.productIds) AND w.customerId = ${customerId} GROUP BY p.productId;`;
    const details = await sequelize.query( query,
                   { type: sequelize.QueryTypes.SELECT })

   
    const count = await Product.count();
    res.send(response(200, 'Success', details, count));
})



module.exports = router;