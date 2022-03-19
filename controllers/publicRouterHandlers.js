const { log } = require('console');
const emailSender = require('../models/emailSender');

const getHome = (req, res) => {
  
};

const getAbout = (req, res) => {
  
};

const getRegister = (req, res) => {
  
};
const postRegister = (req, res) => {
  log(req.body)
  //const { email, password } = req.body;

};
const getContact = (req, res) => {
  //console.log(req.query);
  
};
const postContact = (req, res) => {
  log(req.body);
  //const { email, password } = req.body;

};;


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
