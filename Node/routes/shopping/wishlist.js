const express = require('express');
const router = express.Router();
const WishList = require('../../models/shopping/wishlist');
const lodash = require('lodash');
const sequelize = require('../../startup/sqldb');
const { QueryTypes } = require('sequelize');
const response = require('../../models/response');
const Wishlist = require('../../models/shopping/wishlist');

// to add products to wishlist
router.post('/', async (req, res) => {
    const customerExists = await sequelize.query(`SELECT * FROM wishlists WHERE customerId=${req.body.CustomerId}`, { type: QueryTypes.SELECT });
    if (customerExists.length > 0) {
        // In the list productId exits?
        const findProductQuery = `SELECT * FROM wishlists WHERE customerId=${req.body.CustomerId} AND CONCAT(',', productIds, ',') LIKE CONCAT('%,' '${req.body.ProductIDs}', ',%')`;
        const productExists = await sequelize.query(findProductQuery, { type: QueryTypes.SELECT });
        if (productExists.length > 0) {
            // remove that productId from the list
            const updateQuery = `UPDATE wishlists SET productids = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', productids, ','), CONCAT(',', ${req.body.ProductIDs} , ','), ',')) 
                                 WHERE  customerId = ${req.body.CustomerId} AND  CONCAT(',', productids, ',') LIKE CONCAT('%,', ${req.body.ProductIDs} , ',%')`;
            const result = sequelize.query(updateQuery, { type: QueryTypes.UPDATE });
            return res.send(response('200', 'Removed From Wishlist', result, 1));
        }
        else {
            // add that product id to the list
            const updateQuery = `UPDATE wishlists SET productids = CONCAT_WS(',', productids, ${req.body.ProductIDs}) WHERE customerId =  ${req.body.CustomerId} AND NOT FIND_IN_SET( ${req.body.ProductIDs}, productids)`;
            const result = sequelize.query(updateQuery, { type: QueryTypes.UPDATE });
            return res.send(response('200', 'Added To  Wishlist', result, 1));
        }
    }
    else {
        const result = await sequelize.query(`INSERT INTO wishlists (customerId, productIds, createdAt, updatedAt) VALUES (${req.body.CustomerId}, "${req.body.ProductIDs}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, { type: QueryTypes.INSERT });
        return res.send(response('200', 'Added To  Wishlist', result, 1));
    }
})

router.get('/', async (req, res) => {
    if (!req.query.customerId) return res.send(response('400', 'Please, Provide valid customerId', [], 0));
    const query = `SELECT p.* FROM products p JOIN wishlists w ON FIND_IN_SET(p.productId, REPLACE(w.productIds, ' ', '')) > 0 WHERE customerId=${req.query.customerId}`
    const countQuery = `SELECT count(*) FROM products p JOIN wishlists w ON FIND_IN_SET(p.productId, REPLACE(w.productIds, ' ', '')) > 0 WHERE customerId=${req.query.customerId}`
    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
    const count = await sequelize.query(countQuery, { type: QueryTypes.SELECT });
    return res.send(response('200', 'Added To  Wishlist', result, count[0]['count(*)']));
});

router.delete('/', async (req, res) => {
    const updateQuery = `UPDATE wishlists SET productids = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', productids, ','), CONCAT(',', ${req.query.productId} , ','), ',')) 
              WHERE  customerId = ${req.query.customerId} AND  CONCAT(',', productids, ',') LIKE CONCAT('%,', ${req.query.productId} , ',%')`;
    const result = sequelize.query(updateQuery, { type: QueryTypes.UPDATE });
    return res.send(response('200', 'Removed From Wishlist', result, 1));
})



module.exports = router;