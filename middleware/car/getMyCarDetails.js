const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const CarModel = requireOption(objectrepository, 'CarModel');

    return function (req, res, next) {
        CarModel.findOne({_id: req.params.carId}, (err, car) => {
            if (err) {
                return next(err);
            }
            res.locals.car = car;
            return next();
        });
    };
};