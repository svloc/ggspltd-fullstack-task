const db = require('../models');
const { ROLES } = db;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).send({ message: 'Failed! Username is already in use!' });
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).send({ message: 'Failed! Email is already in use!' });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!ROLES.includes(role)) {
        return res.status(400).send({ message: `Failed! Role ${role} does not exist!` });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
