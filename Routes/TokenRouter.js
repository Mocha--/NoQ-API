const express = require('express');
const tokenRouter = express.Router();

tokenRouter.route('/token')
    .get((req, res) => {
        res.send({
            token: 'lalala1'
        });
    });

module.exports = tokenRouter;
