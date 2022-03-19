//const { log } = require('console');
const nodemailer = require('nodemailer');
//require('dotenv').config();

// creat transporter object which contains the email host configuration

const transporter = nodemailer.createTransport({
  //host: 'smtp-mail.outlook.com', process.env.EMAIL_HOST
  //service: 'outlook',
  service: 'yahoo',
  //secureConnection: false,
  //port: '587', process.env.EMAIL_HOST_PORT
  //secure: true,
  auth: {
    //type: 'OAuth2',
    user: 'mbrsyr@yahoo.com', // APP_EMAIL
    pass: 'zqhwimoefcayzgax', //APP_EMAIL_PASSWORD
  },
  //tls: {
  //ciphers: 'SSLv3',
  //rejectUnauthorized: false,
  //},
});
//(salimbarry304)
function sendEmail(mailOption, cb) {
  console.log(mailOption);
  transporter.sendMail(mailOption, (err, info) => {
    //console.log(info);
    if (err) {
      //cb({ result: 'error' });
      console.log(err);
    } else {
      //console.log('Sent:' + info.response);
      cb({ result: 'success' });
    }
  });
}
module.exports = { sendEmail };

/* function sendEmail(emailData) {
  return new Promise((resolve, reject) => {
    const mailOption = {
      from: 'thomas.kuhnert@devugees.org',
      to: process.env.CONTACT_EMAIL,
      subject: 'Email from your website',
      html: `
            <h1>email from contact page in your website</h1>
            <p><strong>Name:</strong> ${emailData.name}</p>
            <p><strong>email:</strong> ${emailData.email}</p>
            <p><strong>department:</strong> ${emailData.department}</p>
            <p>${emailData.message}</p>
            `,
    };
    transporter.sendMail(mailOption, (err, info) => {
      console.log(info);
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
} */
