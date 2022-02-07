const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.name === 'undefined' ||
            typeof req.body.tel === 'undefined' ||
            typeof req.body.password === 'undefined') {
            return next();
        }

        // ha a jelszó és a jelszó megerősítés tartalma nem egyezik hibaüzenetet küld
        // az email, name és tel nem törlődik a hibás formból
        if (req.body.password !== req.body.passwordConfirm) {
            res.locals.error = "A jelszó nem egyezik";
            res.locals.email = req.body.email;
            res.locals.name = req.body.name;
            res.locals.tel = req.body.tel;
            return next();
        }

        // ha az email cím már létezik, akkor hibaüzenetet küld
        // TODO emailcim ellenőrzése
       /* UserModel.findOne({email: req.body.email}, (err, user)=>{
            if(err)
                return next(err);
            if(Object.keys(user).length !== 0)
            {
                res.locals.error = "Ezzel az email címmel már regisztráltak!"
                res.locals.name = req.body.name;
                res.locals.tel = req.body.tel;
                return next();
            }
        });*/
        
       
        if (typeof res.locals.user === 'undefined') {
            res.locals.user = new UserModel();
        }

        res.locals.user.email = req.body.email;
        res.locals.user.name = req.body.name;
        res.locals.user.tel = req.body.tel;
        res.locals.user.password = req.body.password;

        res.locals.user.save((err) => {
            if (err)
                return next(err);
            return res.redirect('/login');
        })
    };
};