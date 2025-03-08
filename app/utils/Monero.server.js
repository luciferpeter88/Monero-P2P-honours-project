import prisma from "../../prisma/prisma";
import { exec } from "child_process";
// I am running my Monero Wallet RPC server on port 18083, so thats why I have used this URL
const RPC_URL = "http://127.0.0.1:18083/json_rpc";
// I have set the username and password for the RPC server as "peter" so therefore I must use these values
const RPC_USER = "peter";
const RPC_PASS = "peter";

export default class Monero {
  constructor(userId) {
    this.userId = userId;
  }
  /**
   * Helper function to execute cURL commands for Monero RPC
   * This function sends a POST request to the Monero Wallet RPC server using cURL
   * Remember to run the Monero Wallet RPC server and Monero Daemon before using this function
   * @see https://getmonero.org/resources/developer-guides/ for more information
   * @param {string} method - Monero RPC method
   * @param {object} params - Parameters for the RPC call
   * @returns {Promise<object>} - The result of the RPC call
   */
  async sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
      const curlCommand = `
        curl --digest -u ${RPC_USER}:${RPC_PASS} --http1.1 -X POST ${RPC_URL} \
        -H "Content-Type: application/json" \
        --data '{
          "jsonrpc": "2.0",
          "id": "0",
          "method": "${method}",
          "params": ${JSON.stringify(params)}
        }'
      `;

      exec(curlCommand, (error, stdout) => {
        if (error) {
          console.error(`cURL Execution Error for ${method}:`, error);
          reject(error);
          return;
        }

        try {
          const data = JSON.parse(stdout);
          if (data.error) {
            console.error(`Monero RPC Error (${method}):`, data.error);
            reject(data.error);
          } else {
            resolve(data.result);
          }
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          reject(parseError);
        }
      });
    });
  }

  /**
   * Create a new Monero account
   * @param {string} label - Label for the account
   * @returns {Promise<object>}
   */
  async createAccount(label) {
    try {
      // passiing the create_account method and the label to the sendRequest method to perform the RPC call
      // in this case, the method is create_account and the params is the label of the account
      // promise is returned and the result is stored in the data variable
      const data = await this.sendRequest("create_account", { label });

      // Save the account details in the database
      const moneroAccount = await prisma.moneroAccount.create({
        data: {
          userId: this.userId,
          accountIndex: data.account_index,
          accountAddress: data.address,
          accountLabel: label,
        },
      });

      console.log("Monero Account saved in database:", moneroAccount);
      return moneroAccount;
    } catch (error) {
      console.error("Error Creating Monero Account:", error);
      throw error;
    }
  }

  /**
   * Create a new Monero subaddress
   * @param {number} accountIndex - The account to create the subaddress under
   * @param {string} label - The label for the subaddress
   * @returns {Promise<object>}
   */
  async createSubAddress(accountIndex, label) {
    return this.sendRequest("create_address", {
      account_index: accountIndex,
      label: label,
    });
  }

  /**
   * Transfer Monero to another address
   * @param {number} accountIndex - The account to send from
   * @param {string} address - The recipient's address
   * @param {number} amount - Amount in XMR (converted to atomic units inside)
   * @returns {Promise<object>}
   */
  async transfer(accountIndex, address, amount) {
    return this.sendRequest("transfer", {
      account_index: accountIndex,
      destinations: [{ address, amount: Math.round(amount * 1e12) }], // Convert XMR to atomic units
      priority: 1,
      ring_size: 11,
      unlock_time: 0,
    });
  }

  /**
   * Get the balance of an account
   * @param {number} accountIndex - The account index
   * @returns {Promise<object>} - { balance, unlocked_balance }
   */
  async getBalance(accountIndex) {
    return this.sendRequest("get_balance", { account_index: accountIndex });
  }

  /**
   * Get transaction history of an account
   * @param {number} accountIndex - The account index
   * @returns {Promise<object>}
   */
  async getTransactions(accountIndex) {
    return this.sendRequest("get_transfers", {
      account_index: accountIndex,
      in: true,
      out: true,
      pending: true,
      failed: true,
      pool: true,
    });
  }

  /**
   * Get all subaddresses of an account
   * @param {number} accountIndex - The account index
   * @returns {Promise<object>}
   */
  async getSubAddresses(accountIndex) {
    return this.sendRequest("get_address", { account_index: accountIndex });
  }

  /**
   * Get all Monero accounts
   * @returns {Promise<object>}
   */
  async getAccounts() {
    return this.sendRequest("get_accounts");
  }
}
