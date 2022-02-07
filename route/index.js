const renderMW = require('../middleware/renderMW');
const authMW = require('../middleware/auth/authMW');
const checkPasswordMW = require('../middleware/auth/checkPasswordMW');
const logoutMW = require('../middleware/auth/logoutMW');
const getCarsMW = require('../middleware/car/getCarsMW');
const getOwnerMW = require('../middleware/car/getOwnerMW');
const getMyCarsMW = require('../middleware/car/getMyCarsMW');
const getCarDetailsMW = require('../middleware/car/getCarDetailsMW');
const saveCarMW = require('../middleware/car/saveCarMW');
const deleteMyCarMW = require('../middleware/car/deleteMyCarMW');
const createUserMW = require('../middleware/user/createUserMW');
const saveUserMW = require('../middleware/user/saveUserMW');
const deleteUserMW = require('../middleware/user/deleteUserMW');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const UserModel = require('../models/user');
const CarModel = require('../models/car');

module.exports = function (app) {
    const objectRepository = {
        UserModel: UserModel,
        CarModel: CarModel
    }

    app.get('/',
        renderMW(objectRepository, 'index'));

    app.use('/login',
        checkPasswordMW(objectRepository),
        renderMW(objectRepository, 'login'));

    app.use('/register',
        createUserMW(objectRepository),
        renderMW(objectRepository, 'register'));

    app.get('/cars',
        getCarsMW(objectRepository),
        renderMW(objectRepository, 'cars'));

    app.get('/car/:carId',
        getCarDetailsMW(objectRepository),
        getOwnerMW(objectRepository),
        renderMW(objectRepository, 'cardetails'));

    app.get('/mycars',
        authMW(objectRepository),
        getMyCarsMW(objectRepository),
        renderMW(objectRepository, 'mycars'));

    app.use('/mycars/new',
        authMW(objectRepository),
        upload.array('photos', 6),
        saveCarMW(objectRepository),
        renderMW(objectRepository, 'neweditcar'));

    app.get('/mycar/:carId',
        authMW(objectRepository),
        getCarDetailsMW(objectRepository),
        renderMW(objectRepository, 'cardetails'));

    app.use('/mycar/:carId/edit',
        authMW(objectRepository),
        getCarDetailsMW(objectRepository),
        upload.array('photos', 6),
        saveCarMW(objectRepository),
        renderMW(objectRepository, 'neweditcar'));

    app.get('/mycar/:carId/delete',
        authMW(objectRepository),
        getCarDetailsMW(objectRepository),
        deleteMyCarMW(objectRepository));

    app.get('/myprofile/:userId',
        authMW(objectRepository),
        renderMW(objectRepository, 'myprofile'));

    app.use('/myprofile/:userId/edit',
        authMW(objectRepository),
        saveUserMW(objectRepository),
        renderMW(objectRepository, 'myprofile'));

    app.use('/myprofile/:userId/delete',
        authMW(objectRepository),
        deleteUserMW(objectRepository));

    app.use('/logout',
        logoutMW(objectRepository));

};


