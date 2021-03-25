function methodNotAllowed(req, res, next) { 
  return next({ status: 405, message: 'Method Not Allowed' });
}