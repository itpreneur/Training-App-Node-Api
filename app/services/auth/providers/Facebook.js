'use strict';

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import auth from 'app/config/auth';
import Service from 'app/helper/Service';

passport.use(new FacebookStrategy(
	{
		clientID: auth.facebook.client_id,
		clientSecret: auth.facebook.client_secret,
		callbackURL: auth.facebook.callback_url,
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback : true,
	},
	( req, accessToken, refreshToken, profile, done ) => {

		let data = profile._json;
		Service.user.registerSocial(
			{
				provider: 'facebook',
				name: data.name,
				email: data.email,
				profile_picture: data.picture.data.url,
				meta: {
					provider: 'facebook',
					id: profile.id,
					token: accessToken,
				}
			},
			done
		);

	}
));

let FacebookRoutes = {

	authenticate: () => {
		return passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] });
	},

	callback: () => {
		return passport.authenticate('facebook', {
			failureRedirect: '/auth/failed'
		});
	}

}

export default FacebookRoutes;
