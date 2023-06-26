const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};


const hasRole = (roleName) => async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    const hasRequiredRole = roles.some((role) => role.name === roleName);

    if (hasRequiredRole) {
      next();
    } else {
      res.status(403).send({ message: `Require ${roleName} Role!` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin: hasRole('admin'),
};

module.exports = authJwt;
