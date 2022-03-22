# green house micro controllers

## technologies and third parties

    - ReactJS
    - NodeJs
    - ExpressJs
    - Mongoose
    - "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "express-session": "^1.17.2",
    "express-validator": "^6.14.0",
    "mongoose": "^6.2.7",
    "mongoose-unique-validator": "^3.0.0",
    "nodemailer": "^6.7.2"

},

## project working tree

## User registration

    * status: Every new user must be created with “Pending” status by default. After registration, he will receive a confirmation email with an activation link. By clicking on it, his status will be updated to “Active”.
    * confirmationCode: A unique token for each user.
