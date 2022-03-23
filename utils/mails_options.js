require('dotenv').config();

const regEmailSentForm = (emailReceiverInfo) => {
  const { userName, email, confirmationCode } = emailReceiverInfo;
  const reg_mailOption = {
    from: process.env.APP_EMAIL,
    to: email,
    subject:
      'congratulation, you have just succeeded to register for or services - Green house',
    html: `
      <h1>registration email from register page in www.green-house.com</h1>
      <p><strong> your user name:</strong> ${userName}</p>
      <p><strong> your registration email:</strong> ${email}</p>
      <p><strong>Thank you for subscribing. Please confirm your email by clicking on the following link -</strong> :</p>
       <a href=http://localhost:5600/api/auth/confirm/${confirmationCode}> Click here</a>
      <p><strong>if you did not register by Green-House services or you have just received this email by mistake, please you can only ignore this email, for more information you can contact us at our email : info@green-house.com , thank you </strong></p>
      `,
  };
  return reg_mailOption;
};

module.exports = { regEmailSentForm };
