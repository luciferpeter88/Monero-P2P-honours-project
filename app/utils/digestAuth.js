import axios from "axios";
import crypto from "crypto";

// const RPC_URL = "http://127.0.0.1:18083/json_rpc";
const RPC_USER = "peter";
const RPC_PASS = "peter";

async function digestAuthRequest(method, url, data) {
  try {
    // First request to get the Digest Auth challenge
    const initialResponse = await axios({
      method,
      url,
      data,
      validateStatus: (status) => status === 401, // We expect 401 first
    });

    const authHeader = initialResponse.headers["www-authenticate"];
    if (!authHeader) throw new Error("No authentication header received");

    // Parse the digest auth header
    const authDetails = parseDigestHeader(authHeader);

    // Generate the response hash
    const ha1 = crypto
      .createHash("md5")
      .update(`${RPC_USER}:${authDetails.realm}:${RPC_PASS}`)
      .digest("hex");
    const ha2 = crypto
      .createHash("md5")
      .update(`${method}:${authDetails.uri}`)
      .digest("hex");
    const responseHash = crypto
      .createHash("md5")
      .update(`${ha1}:${authDetails.nonce}:${ha2}`)
      .digest("hex");

    // Make the authenticated request
    const authString = `Digest username="${RPC_USER}", realm="${authDetails.realm}", nonce="${authDetails.nonce}", uri="${authDetails.uri}", response="${responseHash}"`;

    const finalResponse = await axios({
      method,
      url,
      headers: {
        Authorization: authString,
        "Content-Type": "application/json",
      },
      data,
    });

    return finalResponse.data;
  } catch (error) {
    console.error("Digest Auth Request Failed:", error.message);
    throw error;
  }
}

function parseDigestHeader(header) {
  const authParts = header.split(", ");
  const authObj = {};
  authParts.forEach((part) => {
    const match = part.match(/(\w+)="([^"]+)"/);
    if (match) authObj[match[1]] = match[2];
  });
  return authObj;
}

export default digestAuthRequest;
