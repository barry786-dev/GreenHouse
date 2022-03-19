const mongoose = require('mongoose');
const { Schema } = mongoose;
//const { validateEmail } = require('../controllers/db_Handlers');
//const uniqueValidator = require('mongoose-unique-validator');

// Create user schema
const userSchema = new Schema(
  {
    userFirstName: {
      type: String,
      required: true,
      minLength: [2, 'first name must be more than 2 characters'],
      maxLength: [20, ' first name should be not more than 20 characters'],
    },
    userLastName: {
      type: String,
      required: true,
      minLength: [2, 'last name must be more than 2 characters'],
      maxLength: [20, ' last name should be not more than 20 characters'],
    },
    userName: {
      type: String,
      trim: true,
      //unique: [true, 'That user name address is taken.'],
      unique: true,
      required: true,
      minLength: [4, 'user name must be more than 4 characters'],
      maxLength: [20, ' user name should be not more than 20 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      //unique: [true, 'That email address is taken.'],
      unique: true,
      required: true,
      minLength: [4, 'user name must be more than 4 characters'],
      maxLength: [20, ' user name should be not more than 20 characters'],
      //validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/],
    },
    verified: {
      type: Boolean,
      required: true,
    },
  },
  { collection: 'Users' }
);
// userSchema.plugin(uniqueValidator);
const Users = mongoose.model('users', userSchema);

module.exports = Users;
