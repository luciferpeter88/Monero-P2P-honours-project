import twilio from "twilio";

const twillioAccountSid = "ACa4f3cac00ef5cbeab5ec1998478c9597";
const twilliAuthToken = "5ebc5bd1b20a68c8f9e17f859f067616";
const twillioServiceSid = "VA5398c88b18228ba95afa7911b9c20cc4";

const client = twilio(twillioAccountSid, twilliAuthToken);

export async function sendVerificationCodeCall(phoneNumber) {
  try {
    // start the verification
    const response = await client.verify.v2
      .services(twillioServiceSid)
      .verifications.create({
        channel: "call",
        to: phoneNumber,
      });

    return response.status; // 'pending',
  } catch (error) {
    console.error("Error sending verification call:", error);
    throw new Error("Failed to send verification call.");
  }
}

export async function checkVerificationCode(phoneNumber, code) {
  try {
    const response = await client.verify.v2
      .services(twillioServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code, // A felhasználó által megadott kód
      });

    return response.status === "approved"; // true, ha helyes
  } catch (error) {
    console.error("Error verifying code:", error);
    throw new Error("Failed to verify code.");
  }
}
