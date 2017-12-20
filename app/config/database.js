'use strict';

export default {

	default: {
		//HOST: 'mongodb://heroku_hxz5c5g5:uuldp1gfq7p6knielv4rdbf0rf@ds153501.mlab.com:53501/heroku_hxz5c5g5'
		HOST : process.env.MONGODB_URI
	}
}
