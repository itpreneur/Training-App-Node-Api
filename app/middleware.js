// Middleware for Application
import ContentTypeMiddleware from 'app/global/middlewares/ContentType';
import EmptyContentMiddleware from 'app/global/middlewares/EmptyContent';
import DelayResponseMiddleware from 'app/global/middlewares/DelayResponse';
import LocationMiddleware from 'app/global/middlewares/LocationMiddleware';

import passport from 'passport';
import config_server from 'app/config/server';
import express from 'express';
import body_parser from 'body-parser';
import express_session from 'express-session';
import cors from 'cors';

let middleware = function(app){

app.use( passport.initialize() );
app.set( 'port', process.env.PORT || config_server.PORT );
app.disable('x-powered-by'); // disable powered by from response header
app.enable( 'trust proxy', ['loopback', 'linklocal', 'uniquelocal'] )
app.use(express_session({
	secret: config_server.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	// cookie: { secure: true }
}))
app.use( body_parser.urlencoded({ extended: false }) ); // parse application/x-www-form-urlencoded
app.use( body_parser.json() ); // parse application/json

/**
 * enable CORS support. // Cross-Origin Request Support
 */
// register all custom Middleware
app.use( cors({ optionsSuccessStatus: 200 }) );
app.use( ContentTypeMiddleware );
app.use( EmptyContentMiddleware );
app.use( LocationMiddleware );

}

export default middleware;
