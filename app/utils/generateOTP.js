export default function generateOTP() {
  let otp = "";
  const length = 5;
  for (let i = 0; i < length; i++) {
    otp = otp + Math.floor(Math.random() * 10);
  }

  return otp;
}
