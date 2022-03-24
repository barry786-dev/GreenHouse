const { log } = require('console');
const path = require('path');
const { checkSN, addUserToProduct } = require('./db_products_Handlers.js');

const getRegisteredUser = (req, res) => {
  if (req.session.user) {
  } else {
    res.redirect('/login');
  }
};

const getDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, '../dashboard.html'));
};

const postDashboard = async (req, res) => {
  log('RegisteredUserRouterHandlers.js,postDashboard, req.body', req.body);
  const serialNumber = req.body.serialNumber;
  const result = await checkSN(serialNumber);
  if (result === 'NoSN') {
    return res.send({
      msg: 'this serial number is not exist',
    });
  }
  if (result === 'UPR') {
    return res.send({
      msg: 'this product is already sold and it is in use',
    });
  }
  if (result === 'success') {
    const addProductResult = await addUserToProduct(
      serialNumber,
      req.session.user.userId
    );
    if (addProductResult === 'NoP') {
      return res.status(404).send({ message: 'product Not found.' });
    }
    if (addProductResult === 'wrong') {
      return res.status(404).send({ message: 'something going wrong' });
    }
    if (addProductResult === 'added') {
      return res.json({ message: 'your product is ready to be used' });
    }
  }
};

const logout = (req, res) => {
  req.session.destroy();
  //req.session = null;
  res.redirect('/login');
};

const logOutPost = (req, res) => {
  req.session.destroy();
  //res.json('done');
};
module.exports = {
  getRegisteredUser,
  logout,
  logOutPost,
  getDashboard,
  postDashboard,
};
