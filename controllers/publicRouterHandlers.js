const { log } = require('console');
const bcrypt = require('bcryptjs');
const path = require('path');
const nodeFetch = require('node-fetch');
const { sendEmail } = require('../models/emailSender');
const {
  regEmailSentForm,
  contactEmailSentForm,
} = require('../utils/mails_options');
const { validationResult } = require('express-validator');
const { registerUser, findUser } = require('./db_users_Handlers');

/****** */
const getHome = (req, res) => {
  if (!req.session.user) {
    res.render('index', {
      title: 'Gad Eden',
      signed: false,
      alertModel: { show: false },
    });
  } else if (req.session.user.userType === 'admin') {
    res.render('index', {
      title: 'Gad Eden',
      signed: true,
      alertModel: { show: false },
    });
  } else {
    document.getElementById('sign-up-in_section').style.display = 'none';
    res.render('index', {
      title: 'Gad Eden',
      signed: true,
      alertModel: { show: false },
    });
  }

  //  if (!req.session.user) {
  //    //res.redirect('/auth');
  //    res.sendFile(path.join(__dirname, '../views/login.html'));
  //  } else if (req.session.user.userType === 'admin') {
  //    //res.redirect('/admin');
  //    res.sendFile(__dirname + '/views/index.html');
  //  } else {
  //    res.redirect('/user/dashboard');
  //  }
};
////////////////////////////////////
const getAbout = (req, res) => {
  if (!req.session.user) {
    res.render('about', { title: 'Gad Eden | About us', signed: false });
  } else if (req.session.user.userType === 'admin') {
    res.render('about', { title: 'Gad Eden | About us', signed: true });
  } else {
    document.getElementById('sign-up-in_section').style.display = 'none';
    res.render('about', { title: 'Gad Eden | About us', signed: true });
  }
};
/////////////////////////////////////////////
const getArticles = (req, res) => {
  if (!req.session.user) {
    res.render('articles', { title: 'Gad Eden | Articles', signed: false });
  } else if (req.session.user.userType === 'admin') {
    res.render('articles', { title: 'Gad Eden | Articles', signed: true });
  } else {
    document.getElementById('sign-up-in_section').style.display = 'none';
    res.render('articles', { title: 'Gad Eden | Articles', signed: true });
  }
};
const getArticle1 = (req, res) => {
  if (!req.session.user) {
    res.render('article-1', { title: 'Gad Eden | Article-1', signed: false });
  } else if (req.session.user.userType === 'admin') {
    res.render('article-1', { title: 'Gad Eden | Article-1', signed: true });
  } else {
    document.getElementById('sign-up-in_section').style.display = 'none';
    res.render('article-1', { title: 'Gad Eden | Article-1', signed: true });
  }
};
/////////////////////////////////////////////
const getContact = (req, res) => {
  if (!req.session.user) {
    res.render('contact-us', {
      title: 'Gad Eden | contact-us',
      sitKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      signed: false,
    });
  } else if (req.session.user.userType === 'admin') {
    res.render('contact-us', {
      title: 'Gad Eden | contact-us',
      sitKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      signed: true,
    });
  } else {
    res.render('contact-us', {
      title: 'Gad Eden | contact-us',
      sitKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      signed: true,
    });
  }
};
const postContact = async (req, res) => {
  //log(req.body);
  const captchaVerified = await nodeFetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.params.captchaResponse}`,
    { method: 'POST' }
  ).then((response) => response.json());
  if (!captchaVerified.success) {
    return res.json({ errorNu: 11, myMsg: 'Captcha Failed' });
  }
  // handling backEnd validation errors
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    log(validationErrors);
    return res.json({
      errorNu: 3,
      myMsg:
        'there are some error in the entered data. May you refresh your page ',
      err: validationErrors.array()[0].msg, // validationErrors.array return array of object errors, so I get the first object to show first error only
    });
  }
  const { name, email, subject, message } = req.body;
  // sending email after contact us form submit
  sendEmail(contactEmailSentForm({ name, email, subject, message })) // contactEmailSentForm() inside /utils/mails_options'
    .then((info) => {
      log(info);
      res.json({
        success: true,
        /* myMsg: `contact-us success , we will contact you soon, thank you`, */
      });
    })
    .catch((error) => {
      // if email sending failed
      // handling error of confirmation email sending
      log(error);
      res.json({
        errorNu: 6,
        /* myMsg:
          'Problem in Email sending from the company side please send email to mbrsyr@yahoo.com, or call our customer support at : +49 157-8444-6611', */
      });
    });
};
////////////////////////////////////
/************ */
/* const getLogin = (req, res) => {
  if (!req.session.user) {
    //res.redirect('/auth');
    res.sendFile(path.join(__dirname, '../views/login.html'));
  } else if (req.session.user.userType === 'admin') {
    //res.redirect('/admin');
    res.sendFile(__dirname + '/views/index.html');
  } else {
    res.redirect('/user/dashboard');
  }
}; */
/*********** */
const postLogin = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  const user = await findUser(userName, 'userName');
  if (user === 'Failed') {
    return res.json({
      errorNu: 0,
      MyMsgToFront:
        'there is error during trying to reach data , please try again or contact the admin',
    });
  } else {
    if (!user) {
      return res.json({ errorNu: 1, MyMsgToFront: 'User not Found' });
    }
  }
  if (user.status != 'Active') {
    return res.status(401).send({
      errorNu: 7,
      message: 'Pending Account. Please Verify Your Email!',
    });
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (passwordIsValid) {
    // fill session with data
    req.session.user = {
      username: user.userName,
      userType: user.userType,
      userId: user._id,
    };
    if (user.userType === 'admin') {
      res.redirect('/');
    } else {
      res.redirect('/user/dashboard');
      //res.json('success login');
    }
  } else {
    res.json({ errorNu: 2, myMsg: 'Invalid Password!' });
  }
};
/////////////////////////////////////////////

/***** */
/* const getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
}; */

/****** */
const postRegister = (req, res) => {
  //log('publicRouterHandlers.js,postRegister, req.body', req.body);
  // handling backEnd validation errors
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    log(validationErrors);
    return res.status(400).json({
      errorNu: 3,
      myMsg: 'there are some error in the entered data',
      err: validationErrors.array()[0].msg,
    });
  }
  //extract the request data from req.body in object form using reduce array method to return object with the requests values
  const UserData = [
    'userFirstName',
    'userLastName',
    'userName',
    'email',
    'password',
  ].reduce((obj, key) => ((obj[key] = req.body[key]), obj), {});

  UserData.password = bcrypt.hashSync(req.body.password, 8);

  //log('publicRouterHandlers.js,postRegister, userData', UserData);

  registerUser(UserData) // start registering process
    .then((theNewAddedUser) => {
      //log(theNewAddedUser);
      // sending confirmation email after registration success
      sendEmail(regEmailSentForm(theNewAddedUser)) // regEmailSentForm() inside /utils/mails_options'
        .then((info) => {
          log(info);
          res.render('index', {
            title: 'Gad Eden',
            signed: false,
            alertModel: {
              show: true,
              modelTitle: ' Registration Success',
              modelMsg: `New user register success , we have sent you an email to : ${theNewAddedUser.email} , please check your email and click on the verification link there to confirm your email, thank you`,
            },
          });
          /* res.json({
            success: true,
            myMsg: `New user register success , we have sent you an email to : ${theNewAddedUser.email} , please check your email and click on the verification link there to confirm your email, thank you`,
          }); */
        })
        .catch((error) => {
          // if email sending failed
          // handling error of confirmation email sending
          log(error);
          res.json({
            errorNu: 6,
            myMsg: `A new user register success , but an error accrued during trying to send verification code to your registered email : ${theNewAddedUser.email},seems like there is a technical issue on email services, please contact our customer services to assist you to complete your registration`,
          });
        });
    })
    .catch((error) => {
      // catching the error which coming from the registerUser()
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
          errorNu: 5,
          message: `An account with that ${JSON.stringify(
            error.err.keyValue
          )} already exists`,
        });
      } else {
        // handling database connection fail errors and other validation errors
        log('coming from inside publicRouterHandlers.js inside registerUser ', [
          error.myMsg,
          error.err.message,
        ]);
        res.json({
          errorNu: error.errorNu,
          message: error.myMsgToUser,
        });
      }
    });
};
/////////////////////////////////////////////
/** */
const verifyUser = async (req, res) => {
  const user = await findUser(req.params.confirmationCode, 'confirmationCode');
  if (user === 'Failed') {
    return res.json({
      errorNu: 0,
      myMsg:
        'there is error during trying to reach data , please try again or contact the admin',
    });
  } else {
    if (!user) {
      return res.json({ errorNu: 1, MyMsgToFront: 'User not Found' });
    }
  }
  user.status = 'Active';
  user.save((err) => {
    if (err) {
      return res.status(500).send({ errorNu: 4, message: err });
    }
    res.redirect('/login');
  });
};
/////////////////////////////////////////////
module.exports = {
  getHome,
  getAbout,
  getArticles,
  getArticle1,
  getContact,
  postContact,
  //getRegister,
  postRegister,
  //getLogin,
  postLogin,
  verifyUser,
};
