module.exports = {
  welcomeEmail: {
    title: "Welcome to Fritado Technologies",
    body: (firstname, lastname,userId) => `
        <p>Dear ${firstname} ${lastname} ${userId},</p>
        <p>Thank you for registering with Fritado. We are excited to have you on board. Feel free to explore our platform and enjoy the features we offer.</p>
        <p>If you have any questions or need assistance, please reach out to us at any time.</p>
      `,
  },
  resetPassword: {
    title: "Reset Your Password",
    body: (resetLink) => `
        <p>Dear User,</p>
        <p>We received a request to reset your password. You can reset your password by clicking the link below:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
  },
  resetPasswordConfirmation: {
    title: "Password Reset Successful",
    body: () => `
        <p>Dear User,</p>
        <p>Your password has been successfully reset. You can now log in with your new password.</p>
        <p>If you did not request this change, please contact our support immediately.</p>
      `,
  },
  sendOtp: {
    title: "Your OTP Code",
    body: (otp) => `
        <p>Dear User,</p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code is valid for 5 minutes.</p>
      `,
  },
};
