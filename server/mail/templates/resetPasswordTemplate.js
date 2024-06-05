const getPasswordResetEmailTemplate = (name, url) => {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
        .highlight {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="#"><img class="logo" src="" alt="Fritado"></a>
        <div class="message">Password Reset Request</div>
        <div class="body">
          <p>Hi ${name},</p>
          <p>It looks like you requested to reset your password for your Fritado account. Click the link below to set a new password:</p>
          <a href="${url}" class="cta">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
          <p>For security purposes, this link will expire in 1 hour. If you need further assistance, please contact our support team at <a href="mailto:support@fritado.com">support@fritado.com</a>.</p>
        </div>
        <div class="support">Thank you, <br>The Fritado Team</div>
      </div>
    </body>
    </html>`;
  };
  
  module.exports = { getPasswordResetEmailTemplate };
  