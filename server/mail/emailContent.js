module.exports = {
  welcomeEmail: {
    title: "Confirmation of Successfull Account Creation",
    body: (firstname, lastname,userId) => `
        <p>Dear ${firstname} ${lastname} (${userId}),</p>
        <p>Congratulations! Your account with Fritado Technologies has been successfully created</p>
        <p>You can now log in using your email address and the password you set during registration. We are excited to have you as part of our community and look forward to serving you.</p>
        <p>If you have any questions or need assistance , please do not hesitate to contact our support team </p>
        <p>Best regards,</p>
        <p>Team Fritado</p>
        `,
  },
  resetPassword: {
    title: "Reset Password Request Instructions",
    body: (firstname, lastname,userId , resetLink) => `
        <p>Dear ${firstname} ${lastname} (${userId}), </p>
        <p>We received a request to reset your password for Fritado Technologies. To proceed , please follow the instruction below:</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>Follow the on-screen instructions to create a new password</>
        <p>If you did not request this, please ignore this email.Your account will remain secure, and no changes will be made</p>
        <p>For any assistance , feel free to contact our support team </p>
        <p>Best regards,</p>
         <p>Team Fritado</p>
        `,
  },
  resetPasswordConfirmation: {
    title: "Password Reset Confirmation",
    body: (firstname, lastname,userId) => `
        <p>Dear  ${firstname} ${lastname} (${userId}),</p>
        <p>We want to inform you that your password has been successfully reset.</p>
        <p>If you did not request this change, please contact our support immediately.</p>
        <p>Thank you for taking steps to keep your account secure </p>
        <p>Best regards,</p>
         <p>Team Fritado</p>
      `,
  },
  sendOtp: {
    title: "Email OTP for Account Creation",
    body: (otp) => `
        <p>Dear User,</p>
        <p>Welcome to Fritado Technologies</p>
        <p>To complete your account creation , please use the following One-Time Password (OTP) to validate your email id</p>
        <p>Your OTP: <strong>${otp}</strong></p>
        <p>This code is valid for next 5 minutes.If you did not initiate this request , please ignore this email</p>
        <p>Thank you for choosing Fritado Technologies , we are excited to have you with us!</p>
        <p>Best regards,</p>
         <p>Team Fritado</p>
        `,
  },
};
