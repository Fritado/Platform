const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification Email</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
              
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
              border: 1px solid #dddddd;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #4CAF50;
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 20px;
              text-align: center;
          }
  
          .highlight {
              font-weight: bold;
              color: #E53935;
              font-size: 24px;
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
  
          .footer {
              background-color: rgba(0, 74, 101, 0.0705882353);
              
              text-align: center;
              border-top: 1px solid #dddddd;
          }
  
          .footer-head {
              margin-bottom: 10px;
          }
  
          .footer-support {
              display: flex;
              justify-content: space-around;
              margin-top: 5px;
              margin-bottom: 5px;
          }
  
          .support-container {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
			  gap:5px;
              justify-content:space-around;
          }
  
          .footer-content {
              margin-top: 20px;
              margin-bottom: 20px;
              text-align: center;
          }
  
          .footer-social-link {
              background-color: #ffffff;
              border-top: 2px solid #dddddd;
              padding: 8px 0;
			  justify-content:space-around;
          }
  
          .social-link {
              display: flex;
              justify-content: center;
              gap: 20px;
              padding-top: 2px;
          }
  
          .footer-text {
              font-size: 12px;
              color: #aaaaaa;
              margin-top: 15px;
              text-align:center;
          }
  
          a {
              color: #4CAF50;
              text-decoration: none;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <a href="#"><img class="logo" src="logo" alt="Fritado"></a>
          <div class="message">OTP Verification Email</div>
          <div class="body">
              <p>Dear User,</p>
              <p>Thank you for registering with Fritado. To complete your registration, please use the following OTP (One-Time Password) to verify your account:</p>
              <h2 class="highlight">${otp}</h2>
              <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email. Once your account is verified, you will have access to our platform and its features.</p>
          </div>
          <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:fritado@in">fritado@in</a>. We are here to help!</div>
      </div>
      <div class="footer">
          <div class="footer-head">
              <h1>Got Questions?</h1>
              <p>We've got you covered. Get in touch with us:</p>
          </div>
          <div class="footer-support">
              <div class="support-container">
                  <span>icon</span>
                  <h4>+91 9745896547</h4>
                  <p>Call us anytime</p>
              </div>
              <div class="support-container">
                  <span>icon</span>
                  <h4>+91 9745896547</h4>
                  <p>Call us anytime</p>
              </div>
              <div class="support-container">
                  <span>icon</span>
                  <h4>+91 9745896547</h4>
                  <p>Call us anytime</p>
              </div>
          </div>
          <div class="footer-content">
              <h1>Fritado Technologies</h1>
              <p>Thank you for registering with Fritado. To complete your registration, please use the following OTP (One-Time Password) to verify your account. If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:fritado@in">fritado@in</a>.</p>
          </div>
          <div class="footer-social-link">
              <p>Login to your account! Unsubscribe: view privacy policy</p>
              <div class="social-link">
                  <span>youtube</span>
                  <span>fb</span>
                  <span>linkedin</span>
              </div>
          </div>
      </div>
      <div class="footer-text">
          &copy; 2024 Fritado Technologies | All rights reserved
      </div>
  </body>
  
  </html>`;
};
module.exports = otpTemplate