const { log } = require('console');
const nodemailer = require('nodemailer');
require('dotenv').config();

// create transporter object which contains the email host configuration

const transporter = nodemailer.createTransport({
  //host: 'smtp-mail.outlook.com', process.env.EMAIL_HOST
  //service: 'outlook',
  service: process.env.EMAIL_SERVICE,
  //secureConnection: false,
  //port: '587', process.env.EMAIL_HOST_PORT
  //secure: true,
  auth: {
    //type: 'OAuth2',
    user: process.env.APP_EMAIL, // APP_EMAIL
    pass: process.env.APP_EMAIL_PASSWORD, //APP_EMAIL_PASSWORD
  },
  //tls: {
  //ciphers: 'SSLv3',
  //rejectUnauthorized: false,
  //},
});
function sendEmail(mailOption) {
  return new Promise((resolve, reject) => {
    log(mailOption);
    transporter.sendMail(mailOption, (err, info) => {
      //log(info);
      if (err) {
        reject({err, myMsg : 'error during sending email coming from sendEmail() in emailSender.js'});
      } else {
        log('Sent:' + info.response);
        resolve(info);
      }
    });
  });
}
module.exports = { sendEmail };
