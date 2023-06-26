const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: 'user' });
      user.roles = [defaultRole._id];
    }
    await user.save();
    res.send({ message: 'User was registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('roles', '-__v');
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user.id, username: username, password: password }, config.secret, {
      expiresIn: 86400, // 24 hours
    });


    const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

    console.log("authorities", authorities);

    req.session.token = token;

    console.log("token", req.session.token);

    res.status(200).send({
      id: user._id,
      username: user.username,
      token: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    res.status(200).send({ message: 'You\'ve been signed out!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
