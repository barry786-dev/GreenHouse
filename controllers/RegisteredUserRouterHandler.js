const {} = require('./db');

const getRegisteredUser = (req, res) => {
  if (req.session.user) {
  } else {
    res.redirect('/login');
  }
};

const logout = (req, res) => {
  req.session.destroy();
  //req.session = null;
  res.redirect('/login');
};

const logOutPost = (req, res) => {
  req.session.destroy();
  res.json('done');
};
module.exports = { getRegisteredUser, logout, logOutPost };
