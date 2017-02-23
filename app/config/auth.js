'use strict';

export default {

	// SCOPES AVAILABLE AT
	// https://developers.facebook.com/docs/facebook-login/permissions
	facebook: {
		client_id: '*************',
		client_secret: '******************8',
		callback_url: '/auth/callback/facebook'
	},

	// SCOPES AVAILABLE AT
	// https://developers.google.com/identity/protocols/googlescopes
	google: {
		client_id: '*********-*************.apps.googleusercontent.com',
		client_secret: '-x_mUjSNRKUTC6ZK8x8KUD0-',
		callback_url: '/auth/callback/google'
	},

	twitter: {
		client_id: '**************',
		client_secret: 'ujhN7dZRwJUZ77OOWe6XMqgx3WeQbD79SFPMRfzIRXXmmqkFMW',
		callback_url: '/auth/callback/twitter'
	},

	instagram: {
		client_id: '***********8',
		client_secret: '********************',
		callback_url: '/auth/callback/instagram'
	},

}
