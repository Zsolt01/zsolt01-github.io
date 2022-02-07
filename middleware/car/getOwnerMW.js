const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        UserModel.findOne({ _id: res.locals.car._owner }, (err, owner) => {
            if (err || !owner) {
                return next(err);
            }
            res.locals.ownerName = owner.name;
            res.locals.ownerTel = owner.tel;
            return next();
        });
    };
};
