const { type } = require("express/lib/response");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.car === 'undefined')
            return next();

        res.locals.car.remove((err) => {
            if(err)
                return next(err);
            
            return res.redirect('/mycars');
        });
    };
};