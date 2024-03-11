const express = require('express');
const router = express.Router();
const WishList = require('../../models/shopping/wishlist');
const lodash = require('lodash');
const sequelize = require('../../startup/sqldb');
const { QueryTypes } = require('sequelize');
const response = require('../../models/response');


router.post('/', async (req, res) => {
    const customerExists = await sequelize.query(`SELECT * FROM wishlists WHERE customerId=${req.body.CustomerId}`,  { type: QueryTypes.SELECT });
    if (customerExists.length > 0) {
        // In the list productId exits?
        const findProductQuery = `SELECT * FROM wishlists WHERE customerId=${req.body.CustomerId} AND CONCAT(',', productIds, ',') LIKE CONCAT('%,' '${req.body.ProductIDs}', ',%')`;
        const productExists = await sequelize.query(findProductQuery,  {type: QueryTypes.SELECT});
        if(productExists.length > 0) {
            // remove that productId from the list
            const updateQuery = `UPDATE wishlists SET productids = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', productids, ','), CONCAT(',', ${req.body.ProductIDs} , ','), ',')) 
                                 WHERE  customerId = ${req.body.CustomerId} AND  CONCAT(',', productids, ',') LIKE CONCAT('%,', ${req.body.ProductIDs} , ',%')`;
            const result = sequelize.query(updateQuery, {type : QueryTypes.UPDATE});
            return res.send(response('200',  'Removed From Wishlist', result, 1));
        }
        else {
            // add that product id to the list
            const updateQuery = `UPDATE wishlists SET productids = CONCAT_WS(',', productids, ${req.body.ProductIDs}) WHERE customerId =  ${req.body.CustomerId} AND NOT FIND_IN_SET( ${req.body.ProductIDs}, productids)`;
            const result = sequelize.query(updateQuery, {type : QueryTypes.UPDATE});
            return res.send(response('200', 'Added To  Wishlist', result, 1));
        }
    }
    else {
        const result = await sequelize.query(`INSERT INTO wishlists (customerId, productIds, createdAt, updatedAt) VALUES (${req.body.CustomerId}, "${req.body.ProductIDs}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,  { type: QueryTypes.INSERT });
        return res.send(response('200',  'Added To  Wishlist', result, 1));
    }
})

router.get('/', async (req, res) => {
    const result = await WishList.findAll();
    res.send(result);
})



module.exports = router;