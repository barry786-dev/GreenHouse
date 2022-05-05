require('dotenv').config();

const regEmailSentForm = (emailReceiverInfo) => {
  const { userName, email, confirmationCode } = emailReceiverInfo;
  const reg_mailOption = {
    from: process.env.APP_EMAIL, //mbrsyr@yahoo.com
    to: email,
    subject:
      'congratulation, you have just succeeded to register for or services - Green house',
    html: `
      <h1>registration email from register page in  our green-house GadEden site</h1>
      <p><strong> your user name:</strong> ${userName}</p>
      <p><strong> your registration email:</strong> ${email}</p>
      <p><strong>Thank you for subscribing. Please confirm your email by clicking on the following link -</strong> :</p>
       <a href=https://mygadeden.herokuapp.com/api/auth/confirm/${confirmationCode}> Click here</a>
      <p><strong>if you did not register by Green-House services or you have just received this email by mistake, please you can only ignore this email, for more information you can contact us at our email : info@green-house.com , thank you </strong></p>
      `,
  };
  return reg_mailOption;
};

const contactEmailSentForm = (emailReceiverInfo) => {
  const { name, email, subject, message } = emailReceiverInfo;
  const contact_mailOption = {
    from: process.env.APP_EMAIL, //mbrsyr@yahoo.com
    to: process.env.CONTACT_EMAIL, //mawlana133@gmail.com
    subject: `${name} has sent you a message from contact page in www.green-house.com`,
    html: `
      <h1>contact email from contact page in www.green-house.com</h1>
      <p><strong> customer first name:</strong> ${name}</p>
      <p><strong> customer email:</strong> ${email}</p>
      <p><strong> customer subject:</strong> ${subject}</p>
      <p><strong> customer subject:</strong> ${message}</p>`,
  };
  return contact_mailOption;
};

module.exports = { regEmailSentForm, contactEmailSentForm };
