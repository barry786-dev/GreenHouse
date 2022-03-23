const { log } = require('console');
const Users = require('../models/db_userSchema');
const { ghDbConnect } = require('../models/db_mongo');
const { getNewToken } = require('../utils/token');

async function findUserByNameOrEmail(userNameOrPassword) {
  try {
    await ghDbConnect();
    if (validateEmail(userNameOrPassword)) {
      const user = await Users.findOne({ email: userNameOrPassword });
      return user;
    } else {
      const user = await Users.findOne({ userName: userNameOrPassword });
      return user;
    }
  } catch (err) {
    log(
      'this error coming from db_handler.js from inside findUserByNameOrEmail()',
      err
    );
    return 'Failed';
  }
}

async function findUserByConfirmationCode(userConfirmationCode) {
  try {
    await ghDbConnect();
    const user = await Users.findOne({
      confirmationCode: userConfirmationCode,
    });
    return user;
  } catch (err) {
    log(
      'this error coming from db_handler.js from inside findUserByNameOrEmail()',
      err
    );
    return 'Failed';
  }
}

async function checkDuplicateUsername(userName) {
  const existUser = await Users.findOne({ userName: userName });
  if (existUser) {
    return true;
  }
}
async function checkDuplicateEmail(email) {
  const existEmail = await Users.findOne({ email: email });
  if (existEmail) {
    return true;
  }
}

/**
 *
 * @param {String} email
 * @returns Boolean
 */
const validateEmail = (email) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};

/**
 *
 * @param {{UserData Registered user data}}
 */
const registerUser = (UserData) => {
  return new Promise((resolve, reject) => {
    ghDbConnect()
      .then(() => {
        const newToken = getNewToken();
        const newUser = new Users({ ...UserData, confirmationCode: newToken });
        newUser
          .save()
          .then((savedUser) => resolve(savedUser))
          .catch((error) =>
            reject({
              myMsgToUser: error.message,
              myMsg:
                'error during try to save the user come from db_Handlers.js from inside registerUser',
              err: error,
            })
          );
      })
      .catch((error) =>
        reject({
          myMsgToUser:
            'error during trying to connect to main database, please try again later or contact the admin',
          myMsg:
            'error during try to connect to the data come from db_Handlers.js from inside registerUser',
          err: error,
        })
      );
  });
};

module.exports = {
  validateEmail,
  registerUser,
  checkDuplicateUsername,
  checkDuplicateEmail,
  findUserByNameOrEmail,
  findUserByConfirmationCode,
};
