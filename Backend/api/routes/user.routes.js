const { authJwt } = require('../jwtutil');
const controller = require('../controllers/user.controller');
const crudController = require('../controllers/crud.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  const userRoutes = require('express').Router();

  userRoutes.get('/all', controller.allAccess);
  userRoutes.get('/user', [authJwt.verifyToken], controller.userBoard);
  userRoutes.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  userRoutes.post('/add', [authJwt.verifyToken], crudController.addPost);
  userRoutes.put('/update/:id', [authJwt.verifyToken], crudController.updatePost);
  userRoutes.delete('/delete/:id', [authJwt.verifyToken], crudController.deletePost);
  userRoutes.get('/viewAll', [authJwt.verifyToken], crudController.getAllPosts);
  userRoutes.get('/:id', [authJwt.verifyToken], crudController.getPostById);

  app.use('/api/post', userRoutes);
};
