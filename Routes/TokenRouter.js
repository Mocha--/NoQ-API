const express = require('express');
const tokenRouter = express.Router();

tokenRouter.route('/token')
    .post((req, res) => {
        res.send({
            token: 'hehehe'
        });
    });

module.exports = tokenRouter;
