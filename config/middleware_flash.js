module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}

// we use connect-flesh because it is responsible for putting the flash into the session cookie and removing it from 
// the session cookie. we neeed to create a new middleware bcz we have to put that message in responce.