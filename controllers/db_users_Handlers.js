const { log } = require('console');
const Users = require('../models/db_userSchema');
const { ghDbConnect } = require('../models/db_mongo');
const { getNewToken } = require('../utils/token');

/** */
async function findUser(value, key) {
  try {
    await ghDbConnect();
    const user = await Users.findOne({ [key]: value });
    return user;
  } catch (err) {
    log('this error coming from db_handler.js from inside findUser()', err);
    return 'Failed';
  }
}
/////////////////////////////////////////////////////////////////////////////////
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
              errorNu: 4,
              myMsgToUser: error.message,
              myMsg:
                'error during try to save the user come from db_Handlers.js from inside registerUser',
              err: error,
            })
          );
      })
      .catch((error) =>
        reject({
          errorNu: 0,
          myMsgToUser:
            'error during trying to connect to main database, please try again later or contact the admin',
          myMsg:
            'error during try to connect to the data come from db_Handlers.js from inside registerUser',
          err: error,
        })
      );
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// I did no check the database connection here because I will depend on that exist connection, and if it failed for any reason, the data base will take care for the duplicate email or userName
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// I am not going to use it in the moment because I will use match validation key inside my db_userSchema.js instead of this validateEmail(), the result will be the same
// if you decide to use this function, you should change the validation key inside the db_userSchema.js and do not forget to export it from here to use it inside the db_userSchema.js
/* *
 *
 * @param {String} email
 * @returns Boolean
 */
/* const validateEmail = (email) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}; */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  registerUser,
  checkDuplicateUsername,
  checkDuplicateEmail,
  findUser,
};
