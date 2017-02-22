'use strict';

import ResponseTemplate from 'app/global/templates/response';

let EmptyContent = ( req, res, next ) => {

	const ignored_routes = [
		'/users/upload-profile-picture',
		'/users/upload-documents',
		'/events/upload',
	];

	if( req.method === 'POST' && ! ignored_routes.includes(req.path) && Object.keys(req.body).length === 0 ) {
		res.json( ResponseTemplate.emptyContent() );
	}
	else {
		next();
	}

}


export default EmptyContent;

