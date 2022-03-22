const { log } = require('console');
const emailSender = require('../models/emailSender');
const { regEmailSentForm } = require('../utils/mails_options');
const { validationResult } = require('express-validator');
const { registerUser } = require('./db_Handlers');
const userNameEmail = {};

const getHome = (req, res) => {};

const getAbout = (req, res) => {};

const getRegister = (req, res) => {};

const postRegister = (req, res) => {
  log('publicRouterHandlers.js,postRegister, req.body', req.body);
  userNameEmail.userName = req.body.userName;
  userNameEmail.email = req.body.email;
  // handling backEnd validation errors
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    log(validationErrors);
    return res.status(400).json({
      myMsg: 'there are some error in the entered data',
      err: validationErrors.array()[0].msg,
    });
  }
  //extract the request data from req.body in object form
  const UserData = [
    'userFirstName',
    'userLastName',
    'userName',
    'email',
    'password',
  ].reduce((obj, key) => ((obj[key] = req.body[key]), obj), {});

  log('publicRouterHandlers.js,postRegister, userData', UserData);

  registerUser(UserData) // start registering process
    .then((theNewAddedUser) => {
      log(theNewAddedUser);
      // sending confirmation email after registration success
      emailSender
        .sendEmail(regEmailSentForm(theNewAddedUser))
        .then((info) => {
          log(info);
          res.json({
            myMsg: `New user register success , we have sent you an email to : ${theNewAddedUser.email} , please check your email and click on the verification link there to confirm your email, thank you`,
          });
        })
        .catch((error) => {
          // handling error of confirmation email sending
          log(error);
          res.json({
            myMsg: `A new user register success , but an error accrued during trying to send verification code to your registered email : ${theNewAddedUser.email},seems like there is a technical issue on email services, please contact our customer services to assist you to complete your registration`,
          });
        });
    })
    .catch((error) => {
      // handling database unique validations errors
      if ((error.err.name = 'MongoServerError' && error.err.code === 11000)) {
        log([
          error.err.name,
          error.err.code,
          error.err.keyValue,
          error.err.message,
          error.myMsg,
        ]);
        res.json({
          message: `An account with that ${JSON.stringify(
            error.err.keyValue
          )} already exists`,
        });
      } else {
        // handling database connection fail errors and other validation errors
        log([error.myMsg, error.err.message]);
        res.json({
          message: error.myMsgToUser,
        });
      }
    });
};
const getContact = (req, res) => {
  //log(req.query);
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
  userNameEmail,
};
