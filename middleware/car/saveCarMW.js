const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const CarModel = requireOption(objectrepository, 'CarModel');

    return function (req, res, next) {
        if (typeof req.body.make === 'undefined' || typeof req.body.model === 'undefined' ||
            typeof req.body.regFrom === 'undefined' || typeof req.body.mileage === 'undefined' ||
            typeof req.body.price === 'undefined') {
            return next();
        }

        if (typeof res.locals.car === 'undefined') {
            res.locals.car = new CarModel();
        }

        res.locals.car.make = req.body.make;
        res.locals.car.model = req.body.model;
        res.locals.car.regFrom = req.body.regFrom;
        res.locals.car.mileage = req.body.mileage;
        res.locals.car.price = req.body.price;
        res.locals.car.description = req.body.description;
        res.locals.car._owner = req.session.user._id;

        for(let i=0; i < res.locals.car.images.length; i++)
        {
            if( typeof req.body[i] !== 'undefined')
                res.locals.car.images.splice(i, 1);
        }

        if(req.files !== 'undefined') {
        req.files.forEach((image) => {
            res.locals.car.images.push(image.filename);
        });}

        res.locals.car.save((err) => {
            if (err)
                return next(err);
            return res.redirect('/mycars');
        })
    };
};