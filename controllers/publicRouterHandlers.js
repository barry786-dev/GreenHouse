const { log } = require('console');
const emailSender = require('../models/emailSender');
const { validationResult } = require('express-validator');
const { registerUser } = require('./db_Handlers');

const getHome = (req, res) => {};

const getAbout = (req, res) => {};

const getRegister = (req, res) => {};

const postRegister = (req, res) => {
  log(req.body);
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res
      .status(400)
      .json({
        myMsg: 'there are some error in the entered data',
        err: errors.array(),
      });
  }
  const UserData = [
    userFirstName,
    userLastName,
    userName,
    email,
    password,
  ].reduce((obj, key) => ((obj[key] = req.body[key]), obj), {});
  registerUser(UserData)
    .then((theNewAddedUser) => {
      log(theNewAddedUser);
      res.json({ myMsg: 'New user register success' });
    })
    .catch((error) => log([error.err.code, error.err.keyValue, error.myMsg]));

  if (error.err.code === 11000) {
    res.json({
      message: `An account with that ${JSON.stringify(
        error.err.keyValue
      )} already exists`,
    });
  } else {
    res.json({
      message: error,
    });
  }
};
const getContact = (req, res) => {
  //console.log(req.query);
};
const postContact = (req, res) => {
  log(req.body);
  //const { email, password } = req.body;
};

const getLogin = (req, res) => {};

const postLogin = (req, res) => {
  const { email, password } = req.body;
  if (email === 'mbrsyr@yahoo.com' && password === '123456') {
    // fill session with data
    req.session.user = {
      username: 'admin',
    };
    res.json('done');
  } else {
    res.json('error');
  }
};

module.exports = {
  getHome,
  getAbout,
  getContact,
  postContact,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
};
