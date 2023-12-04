const nodemailer = require('nodemailer');

function generateActivationCode() {
  const min = 100000; 
  const max = 999999; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isCodeValid(code) {
  return code % 7 === 0;
}

function sendActivationEmail(email, activationCode) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'SOUPhelper@gmail.com',
      pass: 'SoupSoup123',
    },
  });

  const mailOptions = {
    from: 'SOUPhelper@gmail.com',
    to: email,
    subject: 'Activation Code for Your SOUP Account',
    text: `Your activation code is: ${activationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function activationMiddleware(req, res, next) {
  const { email } = req.body; 
  const activationCode = generateActivationCode();

  sendActivationEmail(email, activationCode);

  req.activationCode = activationCode; 
  next();
}

module.exports = { activationMiddleware, isCodeValid };
