const { check } = require('express-validator');
const {
  checkDuplicateUsername,
  checkDuplicateEmail,
} = require('../controllers/db_Handlers');

const Validation_register_user = [
  check('userFirstName')
    .isLength({ min: 2, max: 20 })
    .withMessage('userFirstName should be between 2 and 20 characters')
    .notEmpty()
    .withMessage('userFirstName should not be empty')
    .isAlpha()
    .withMessage('userFirstName should not has numbers or special characters'),
  check('userLastName')
    .isLength({ min: 2, max: 20 })
    .withMessage('userLastName should be between 2 and 20 characters')
    .notEmpty()
    .withMessage('userLastName should not be empty')
    .isAlpha()
    .withMessage('userLastName should not has numbers or special characters'),
  check('userName')
    .isLength({ min: 2, max: 20 })
    .withMessage('userName should be between 2 and 20 characters')
    .notEmpty()
    .withMessage('userName should not be empty')
    .isAlpha()
    .withMessage('userName should not has numbers')
    .bail()
    .custom(checkDuplicateUsername)
    .withMessage(
      ' This user name is not available try another one or go to login'
    ),
  check('email')
    .isLength({ min: 4, max: 40 })
    .withMessage('email should be between 4 and 40 characters')
    .isEmail()
    .withMessage('This is not a valid Email address')
    .normalizeEmail()
    .bail()
    .custom(checkDuplicateEmail)
    .withMessage(
      ' This Email is already exist try another one or go to login'
    ),
  ,
  check('password')
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage('password should be between 8 and 20 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'
    ),
];
module.exports = { Validation_register_user };

/* const Validation_register_user = checkSchema({
  userFirstName: {
    isLength: {
      errorMessage: 'userFirstName should be between 2 and 20 characters',
      options: { min: 2, max: 20 },
    },
    isAlpha: {
      errorMessage: 'userFirstName should has no numbers',
      options: { min: 2, max: 20 },
    },
  },
  userLastName: {
    isLength: {
      errorMessage: 'userLastName should be between 2 and 20 characters',
      options: { min: 2, max: 20 },
    },
  },
  userName: {
    isLength: {
      errorMessage: 'userLastName should be between 4 and 20 characters',
      options: { min: 4, max: 20 },
    },
    trim: true,
  },
  email: {
    isLength: {
      options: { min: 2, max: 50 },
    },
  },
  password: {
    isLength: {
      options: { min: 2, max: 50 },
    },
  },
});
 */

/* const validateStrongPassword = body('password')
  .isString()
  .isLength({ min: 8 })
  .not()
  .isLowercase()
  .not()
  .isUppercase()
  .not()
  .isNumeric()
  .not()
  .isAlpha(); */
