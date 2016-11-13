const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

/*
 * import configs
 */
const DB = require('./Config/Db.js');
const API = require('./Config/Api.js');

mongoose.connect(`mongodb://${DB.HOST}:${DB.PORT}/${DB.NAME}`);
mongoose.Promise = Promise;

const ordersRouter = require('./Routes/OrdersRouter.js');
const tokenRouter = require('./Routes/TokenRouter.js');

/*
 * apply body parser json
 */
server.use(bodyParser.json());
server.use(cors());

/*
 * apply routers
 */
server.use(`/${API.VERSION}`, ordersRouter);
server.use(`/${API.VERSION}`, tokenRouter);

server.listen(`${API.PORT}`, (err) => {
    console.info(' ');
    console.info('*'.repeat(28));
    console.info(`* Listening localhost:${API.PORT} *`);
    console.info('*'.repeat(28));
    console.info(' ');
});
