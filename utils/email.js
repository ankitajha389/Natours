const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io", // Replace with real provider in production
    port: 2525,
    auth: {
      user: "your_user",
      pass: "your_pass"
    }
  });

  const mailOptions = {
    from: 'Your Company <no-reply@company.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
