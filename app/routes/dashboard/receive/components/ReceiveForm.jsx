import { useState } from "react";
import { Button } from "../../../../../src/components/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../src/components/components/ui/select";
import { Form } from "@remix-run/react";

export default function ReceiveForm({
  accounts,
  selectedAccount,
  setSelectedAccount,
  subadresses,
}) {
  const [copySuccess, setCopySuccess] = useState({});

  // Copy a specific subaddress to the clipboard
  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopySuccess(() => ({
      [address]: true, // Mark only this address as copied
    }));

    setTimeout(() => {
      setCopySuccess(() => ({
        [address]: false, // Reset after timeout
      }));
    }, 2000);
  };
  return (
    <div className="flex flex-col md:flex-row gap-5 mt-5 text-white">
      {/* Left Side - Interactive Form */}
      <div className="w-full bg-third p-6 rounded-lg shadow-lg">
        <h3 className="text-md font-medium flex items-center gap-2 mb-3">
          <span className="text-blue-500">📁</span> Generate Receiving Address
        </h3>
        {/* Account Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2" htmlFor="account">
            Select Account
          </label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full h-12 rounded-lg sm:ml-auto px-3 border-none outline-none bg-primary text-white focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus:ring-primary focus:ring-offset-primary">
              <SelectValue className="outline-none border-none bg-primary text-white" />
            </SelectTrigger>

            <SelectContent className="rounded-b-lg rounded-t-none border-muted-foreground w-full bg-primary border-none">
              {accounts.map((account) => (
                <SelectItem
                  key={account.id}
                  value={account.id}
                  className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
                >
                  {account.accountLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Generate Address Button */}
        <Form method="post">
          <input type="hidden" name="selectedAccount" value={selectedAccount} />
          <div className="mb-5">
            <Button className="bg-secondary" type="submit">
              Generate Address
            </Button>
          </div>
        </Form>

        {/* Display the Generated Address */}
        <div className="mt-5">
          <label className="block text-sm font-medium mb-2" htmlFor="address">
            Your Receiving Address
          </label>
          {subadresses.length > 0 ? (
            subadresses.map((subaddress, index) => {
              const shortAddress =
                subaddress.address.slice(0, 6) +
                "..." +
                subaddress.address.slice(-6);
              return (
                <div
                  key={index}
                  className="flex items-center bg-primary p-3 rounded-md my-3"
                >
                  <input
                    type="text"
                    value={shortAddress} // Display shortened address
                    readOnly
                    className="w-full bg-transparent text-white text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(subaddress.address)}
                    className="ml-3 text-secondary hover:text-white"
                  >
                    {copySuccess[subaddress.address] ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground text-sm">
              No subaddresses found for this account.
            </p>
          )}
        </div>
      </div>
      {/* Right Side - Tips & Best Practices */}
      <div className="w-full md:w-64 bg-third p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">💡 Tips</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Generating a new subaddress for each transaction improves your
          privacy.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Share the generated address with the sender only after verifying it.
        </p>
      </div>
    </div>
  );
}
