# Code Map

## errors Map

- Front End error messages numbers:

  - 0 : Error during connecting to database or trying to reach to collections
  - 1 : Searched document is not exist 'User not Found'
  - 2 : The user is exist but the used password is not matching 'Invalid Password!'
  - 3: Server validation error('bad data reached to the server from FrontEnd) or Captcha Failed
  - 4: Data Base validation error
  - 5: User or email is already exist
  - 6: failed to send email // nodemailer
  - 7: Pending Account. Please Verify Your Email!
  - 8: this serial number is not exist
  - 9: this product is already sold and it is in use
  -10: you can not add this product because you are not the owner of this product
  -11: Captcha Failed

## session

- session is exist inside ./controllers/publicRouterHandlers.js, inside postLogin function.
- session object

```javascript
req.session.user = {
  username: user.userName,
  userType: user.userType,
  userId: user._id,
};
```

## Schemas

- Schemas are exist under ./models

- A model collection will be build inside each mongoose database schemas file and will be exported to be used where it is needed
  Example

  ```java script
  const Users = mongoose.model('users', userSchema);
  module.exports = Users;
  ```

  To use it you need to require it at the place where you need it

  ```java script
  const Users = require('../models/db_userSchema');
  ```

- DataBase mongoose Schemas named according to each collection

- **db_productSchema.js**
- **db_userSchema.js**

- there is one file for server side validation schemas **validationSchemas.js**

  - inside **validationSchemas.js** will find array for each revived data validation with error messages.
  - the validation array will be used inside the right route after require it
    - example

        ```javascript
        const { Validation_register_user } = require('../models/validationSchemas');
        router.post('/register', Validation_register_user, postRegister);
        ```

  - We add to Validation_register_user express schema two functions to check the duplicate of trying to register the same user data, we used these two functions
    - **checkDuplicateUsername()** ./controllers/db_users_Handlers.js
    - **checkDuplicateEmail()** ./controllers/db_users_Handlers.js

- Server side validation is there to be as first wall protection from bad data which could come from fronted side, it will work to be sure that right data will be send to Data base, even though that database schema validation are there too for last wall check.

## ./controllers/db_user_Handlers.js

It is the file which hold all needed functions to deal with data base like finding document or add new document or update document...etc

- Functions names

  - **findUserByNameOrEmail()** will return the user with specific passed username or email

  - **registerUser()** will return a promise if it solved that means a new user registered inside the database

  - **checkDuplicateUsername()** will return true if the userName is exist

  - **checkDuplicateEmail()** will return true if the Email is exist

## ./utils

- token.js
  - **getNewToken()** will generate a new token to each new user using math logarithm to use it as confirmationCode to verify the user email
  - Under the utils folder you can find also some files like pictures which help in writing MD files documentation for this project

## Sending email to the user

- we are using nodemailer service
- ./models/**emailSender.js** here you can find the code for email sending
- ./util/**mails_option.js** here you can change the structure of the email message which you want to send to the user

## Public Routers

- You can find them inside ./routes/**publicRouter.js**
- Handlers for publicRouters are in ./controllers/**publicRouterHandlers.js**
- he **'/api/auth/confirm/:confirmationCode'** will be the router which will take the passed confirmation parameter to the user email, by route to it will trigger **verifyUser()**
- **verifyUser()** will look if there is a pended user with the passed confirmationCode then will change its status 'Active' instead of 'pending', the user email is verified and will be ready to login
