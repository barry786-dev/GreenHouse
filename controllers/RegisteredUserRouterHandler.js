const { log } = require('console');
const path = require('path');
const { checkSN, addUserToProduct } = require('./db_products_Handlers.js');

///////////////////////////////////////////////////////////////////////////////
/** */
const getRegisteredUser = (req, res) => {
  if (req.session.user) {
    res.redirect('/user/dashboard');
  } else {
    res.redirect('/login');
  }
};
///////////////////////////////////////////////////////////////////////////////
/** */
const getDashboard = (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  } else {
    res.redirect('/login');
  }
};

/** */
const postDashboard = async (req, res) => {
  try {
    const { serialNumber } = req.body;
    const userId = req.session.user.userId;
    const result = await checkSN(serialNumber);
    if (result === 'success') {
      const result2 = await addUserToProduct(serialNumber, userId);
      if (result2.productName) {
        res.json({ message: 'your product is ready to be used' });
      }
    } else {
      res.json(result);
    }
  } catch (error) {
    log(
      'coming from RegisteredUserRouterHandler.js from inside postDashboard',
      error
    );
    res.json({ errorNu: 0, message: 'something going wrong' });
  }
};

///////////////////////////////////////////////////////////////////////////////
const logout = (req, res) => {
  req.session.destroy();
  //req.session = null;
  res.redirect('/login');
};

const logOutPost = (req, res) => {
  req.session.destroy();
  //res.json('done');
};
///////////////////////////////////////////////////////////////////////////////

module.exports = {
  getRegisteredUser,
  logout,
  logOutPost,
  getDashboard,
  postDashboard,
};
