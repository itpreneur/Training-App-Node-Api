'use strict';

import 'app-module-path/register';
import { addPath } from 'app-module-path';
addPath(__dirname);
import path from 'path';
import config_server from 'app/config/server';
import MongoConnect from 'app/mongoose';
import AppRoutes from 'app/routes';
import AppMiddleware from 'app/middleware';
import express from 'express';
import winston from 'winston'
import swagger from 'app/swagger';

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
//---------------------------------------------//
// invoke routes, MIddleware, Mongo connect here
new MongoConnect();
new AppMiddleware(app);
new AppRoutes(app, express);
new swagger(app);

//---------------------------------------------//
let server = app.listen(
    app.get('port'),
    () => {
        const port = process.env.port || server.address().port;
        winston.log('info', `GenNext API running at http://localhost:${port}`)
        console.log('runing...')
    }
);
export default app;
