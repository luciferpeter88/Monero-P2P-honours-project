import prisma from "../../prisma/prisma";
import { exec } from "child_process";
const RPC_URL = "http://127.0.0.1:18083/json_rpc"; // Monero Wallet RPC URL
const RPC_USER = "peter"; // RPC Username
const RPC_PASS = "peter"; // RPC Password

export default class Monero {
  constructor(userId) {
    this.userId = userId;
  }

  async createAccount(label) {
    return new Promise((resolve, reject) => {
      const curlCommand = `
        curl --digest -u ${RPC_USER}:${RPC_PASS} --http1.1 -X POST ${RPC_URL} \
        -H "Content-Type: application/json" \
        --data '{
          "jsonrpc": "2.0",
          "id": "0",
          "method": "create_account",
          "params": { "label": "${label}" }
        }'
      `;

      exec(curlCommand, async (error, stdout, stderr) => {
        if (error) {
          console.error("cURL Execution Error:", error);
          reject(error);
          return;
        }
        if (stderr) {
          console.error("cURL STDERR:", stderr);
        }

        try {
          const data = JSON.parse(stdout);

          if (!data.result) {
            console.error("Monero RPC Error:", data.error);
            reject(data.error);
            return;
          }
          // Save the account details in the database
          const moneroAccount = await prisma.moneroAccount.create({
            data: {
              userId: this.userId,
              accountIndex: data.result.account_index,
              accountAddress: data.result.address,
              accountLabel: label,
            },
          });

          console.log("Monero Account saved in database:", moneroAccount);
          resolve(moneroAccount);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          reject(parseError);
        }
      });
    });
  }
  createSubAddress() {
    // create subaddress
  }
  transfer() {
    // transfer
  }
  getBalance() {
    // get balance
  }
  getTransactions() {
    // get transactions
  }
  getSubAddresses() {
    // get subaddresses
  }
  getAccounts() {
    // get accounts
  }
}
