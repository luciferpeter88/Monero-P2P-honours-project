/* eslint-disable no-undef */
import nodemailer from "nodemailer";

export default async function sendOTPEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Using Gmail SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use the App Password, NOT your regular password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
