const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587, 
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      socketTimeout: 5000, // 20 seconds timeout
      logger: false, // Enable logging
      debug: false, // Enable debugging
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: '"Fritado Technology" <no-reply@fritado.com>',
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
   //console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
