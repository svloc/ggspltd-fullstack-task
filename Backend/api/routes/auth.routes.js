const { verifySignUp } = require('../jwtutil');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });
  const authRoutes = require('express').Router();
  authRoutes.post(
    '/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  authRoutes.post('/signin', controller.signin);
  authRoutes.get('/signout', controller.signout);
  app.use('/api/auth', authRoutes);
};