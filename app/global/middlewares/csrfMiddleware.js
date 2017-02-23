'use strict';

let csrfToken = ( req, res, next ) => {
  res.locals._csrf = req.csrfToken();
  next();
}

export default csrfToken;
