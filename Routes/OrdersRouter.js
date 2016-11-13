const express = require('express');
const ordersRouter = express.Router();
const Order = require('../Models/Order.js');
const { ERROR_CODE, ORDER_STATUS } = require('../Constants.js');

ordersRouter.route('/orders')
    .post((req, res) => {
        const { items } = req.body;
        const order = new Order({
            totalPrice: 100,
            status: ORDER_STATUS.PENDING
        });
        order.save()
            .then(() => {
                res.status(201)
                    .send(order);
            })
            .catch((err) => {
                res.statu(400)
                    .send(err);
            })
    })
    .get((req, res) => {
        const { size = 1000, page = 1, status } = req.query;
        const queryCondition = {};
        !!status ? queryCondition.status = status : '';

        Order
            .find(queryCondition)
            .skip(parseInt(size)* (parseInt(page)- 1))
            .limit(parseInt(size))
            .then((orders) => {
                res.send({
                    orders
                });
            })
            .catch((err) => {
                res.status(400)
                    .send(err)
            });
    });

ordersRouter.route('/orders/:id')
    .put((req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400)
                .send({
                    errorCode: ERROR_CODE.NO_ID_PROVIDED.code,
                    errorDesc: ERROR_CODE.NO_ID_PROVIDED.desc
                });

            return;
        }

        Order.findById(id)
            .then((order) => {
                const { status } = req.body;
                if (!Object.values(ORDER_STATUS).includes(status)) {
                    res.status(400)
                        .send({
                            errorCode: ERROR_CODE.INVALID_REQUEST_BODY.code,
                            errorDesc: `Status must be one of ${Object.values(ORDER_STATUS)}`
                        });

                    return;
                }

                order.status = !!status ? status : order.status;
                order.save()
                    .then(() => {
                        res.send();
                    })
                    .catch((err) => {
                        res.status(400)
                            .send(err);
                    });

                return;
            })
            .catch((err) => {
                res.status(404)
                    .send({
                        errorCode: ERROR_CODE.NOT_FOUND.code,
                        errorDesc: ERROR_CODE.NOT_FOUND.desc
                    });
            });
    });

module.exports = ordersRouter;
