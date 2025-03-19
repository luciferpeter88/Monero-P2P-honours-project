import twilio from "twilio";

const twillioAccountSid = "ACa4f3cac00ef5cbeab5ec1998478c9597";
const twilliAuthToken = "5ebc5bd1b20a68c8f9e17f859f067616";
const twillioServiceSid = "VA5398c88b18228ba95afa7911b9c20cc4";

const client = twilio(twillioAccountSid, twilliAuthToken);

export default async function sendVerificationCode(phoneNumber, code) {
  try {
    const response = await client.verify.v2
      .services(twillioServiceSid)
      .verifications.create({
        // channel: "call",
        channel: "sms",
        customCode: `${code}`,
        to: phoneNumber,
      });

    return response.status; // Returns 'pending' if successful
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw new Error("Failed to send verification code.");
  }
}
