import os
from monero.wallet import Wallet
from monero.backends.jsonrpc import JSONRPCWallet
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to the Monero wallet RPC
# wallet = Wallet(JSONRPCWallet(
#     host=os.getenv("RPC_HOST"),
#     port=int(os.getenv("RPC_PORT")),
#     user=os.getenv("RPC_USER"),
#     password=os.getenv("RPC_PASSWORD")
# ))

# 📊 Get balance
# def get_balance():
#     balance = wallet.balance()
#     unlocked = wallet.unlocked_balance()
#     return {"total_balance": str(balance), "unlocked_balance": str(unlocked)}

# 🆕 Create a new account
# def create_account(label: str):
#     account = wallet.new_account(label=label)
#     return {"account_index": account.account_index, "label": label}

# ➕ Create a new subaddress within an account
# def create_subaddress(account_index: int, label: str):
#     account = wallet.accounts[account_index]
#     subaddress = account.new_subaddress(label=label)
#     return {"account_index": account_index, "subaddress": str(subaddress.address)}

# 💸 Send a transaction
# def send_transaction(destination_address: str, amount: float):
#     try:
#         tx = wallet.transfer([(destination_address, amount)])
#         return {"status": "success", "tx_id": tx.hash}
#     except Exception as e:
#         return {"status": "failed", "error": str(e)}

# 🧪 Test all functions
if __name__ == "__main__":
    print("📊 Checking wallet balance:")
    # print(get_balance())

    # print("\n🆕 Creating a new account:")
    # account_info = create_account("TestUser")
    # print(account_info)

    # print("\n➕ Creating a new subaddress:")
    # subaddress_info = create_subaddress(account_info["account_index"], "TestSubaddress")
    # print(subaddress_info)

    print("\n💸 Sending a transaction (replace with real address!):")
    # Use a test address or your own Monero address here
    # transaction_info = send_transaction("43XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 0.1)
    # print(transaction_info)
