const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        if (typeof req.body.password === 'undefined' || typeof req.body.email === 'undefined')
            return next();

        UserModel.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.locals.userError = "Hibás email cím";
                return next();
            }
            if (user.password === req.body.password) {
                req.session.loggedIn = true;
                req.session.user = user;
                return req.session.save((err) => {
                    return res.redirect('/mycars');
                });
            }
            else {
                res.locals.userError = "Hibás jelszó";
                return next();
            }
        });
    };
};