const router = require('express').Router({ caseSensitive: true, strict: true });

// const { authGuard } = require('./middlewares');
const { login, register, getCityByCoords, searchCities, getPolygon } = require('./controllers');

// router.route('/register').post(register);
// router.route('/login').post(login);

module.exports = router;
