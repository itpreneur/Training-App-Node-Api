'use strict';

import express from 'express';
import passport from 'passport';

import FacebookRoutes from './providers/Facebook';
import GoogleRoutes from './providers/Google';
import TwitterRoutes from './providers/Twitter';
import InstagramRoutes from './providers/Instagram';
import LocalRoutes from './providers/Local';

import Helper from 'app/helper/User';
import UserController from 'app/services/training/controller/UserController';
import ValidAuthTokenMiddleware from 'app/global/middlewares/ValidAuthToken';


let router = express.Router();


passport.serializeUser( (user, done) => {
	done(null, user);
});

passport.deserializeUser( (user, done) => {
	done(null, user);
});



// auth success routes
router.get( '/success', (req, res) => {
	res.json({ message: 'success', login: true });
});
router.get( '/failed', (req, res) => {
	res.json({ message: 'failed', login: false });
});


// default api auth
router.post('/', LocalRoutes.authenticate(),
	( req, res ) => {
		if ( ! req.user.id ) {
			res.json({
				code: 401,
				message: 'error',
				error: req.user.error,
			});
		}
		else {
			let token = Helper.generateToken(req.user);
			res.json({
				code: 200,
				message: 'success',
				token: token
			});
		}
	}
);






let redirectSocialUser = ( req, res ) => {
	let token = Helper.generateToken(req.user);
	res.redirect( Helper.authRedirectUrl(`?token=${token}`) );
}


// auth facebook routes
router.get('/login/facebook', FacebookRoutes.authenticate() );
router.get( '/callback/facebook', FacebookRoutes.callback(), redirectSocialUser );

// auth google routes
router.get('/login/google', GoogleRoutes.authenticate() );
router.get( '/callback/google', GoogleRoutes.callback(), redirectSocialUser );

// auth twitter routes
router.get('/login/twitter', TwitterRoutes.authenticate() );
router.get( '/callback/twitter', TwitterRoutes.callback(), redirectSocialUser );

// auth instagram routes
router.get('/login/instagram', InstagramRoutes.authenticate() );
router.get( '/callback/instagram', InstagramRoutes.callback(), redirectSocialUser );



router.post( '/register', (req, res) => {
	UserController.registerDefault( req.body, ( error, user ) => {
		if ( error ) {
			res.json({ code: 400, message: 'error', error: error });
		}
		else {
			res.json({
				code: 200,
				message: 'success',
				user: user
			});
		}
	});
});



router.get( '/validate', ValidAuthTokenMiddleware, (req, res) => {
	res.json({
		code: 200,
		message: 'success',
		valid: true,
	});
});






router.post( '/reset-password', (req, res) => {

	if ( ! req.body || ! req.body.email ) {
		res.json({
			code: 205,
			message: 'error',
			description: 'email address not provided',
		});
	}
	else {

		UserController.resetPassword( req.body.email, ( error, success) => {
			if ( error ) {
				res.json({ code: 205, message: 'error', description: 'error occoured while resetting password' });
			} else {
				res.json({
					code: 200,
					message: 'success',
					description: 'if this email is registered with us, you will receive a password reset email soon.',
				});
			}
		});


	}

});






module.exports = router;
