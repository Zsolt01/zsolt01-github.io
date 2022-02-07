const User = require('../../models/user');
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const CarModel = requireOption(objectrepository, 'CarModel');

    return function (req, res, next) {
        CarModel.find({_owner: req.session.user._id}, (err, mycars) => {
            if (err) {
                return next(err);
            }
            if(Object.keys(mycars).length === 0)
                res.locals.empty = "Még nincsenek hirdetéseid. Hozz létre egyet!"
                
            res.locals.mycars = mycars;
            return next();
        });
    };
};