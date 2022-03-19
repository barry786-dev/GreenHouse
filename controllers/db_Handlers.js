const Users = require('../models/db_userSchema');
const { ghDbConnect } = require('../models/db_mongo');

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
    ghDbConnect().then(() => {
      const newUser = new Users({ ...UserData, verified: false });
      newUser
        .save()
        .then((savedUser) => resolve(savedUser))
        .catch((error) =>
          reject({
            myMsg:
              'error during try to save the user come from db_Handlers.js from inside registerUser',
            err: error,
          })
        );
    });
  });
};

module.exports = { validateEmail, registerUser };
