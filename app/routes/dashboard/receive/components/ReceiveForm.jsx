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
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";

export default function ReceiveForm({
  accounts,
  selectedAccount,
  setSelectedAccount,
  subadresses,
}) {
  const typography = useStoredValue("typography");
  const colorType = useStoredValue("colourType");
  const titleStyle = {
    fontSize: typography?.size.fontSize,
    letterSpacing: typography?.size.lineHeight,
  };
  const descriptionStyle = {
    fontSize: typography?.size.fontSize - 2,
    letterSpacing: typography?.size.lineHeight,
    backgroundColor: colorType?.primary,
  };
  const descriptionStyle2 = {
    fontSize: typography?.size.fontSize - 2,
    letterSpacing: typography?.size.lineHeight,
  };

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
      <div
        className="w-full bg-third p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h3
          className="text-md font-medium flex items-center gap-2 mb-3"
          style={titleStyle}
        >
          <span className="text-blue-500">📁</span> Generate Receiving Address
        </h3>
        {/* Account Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2" htmlFor="account">
            Select Account
          </label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger
              className="w-full h-12 rounded-lg sm:ml-auto px-3 border-none outline-none bg-primary text-white focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus:ring-primary focus:ring-offset-primary"
              style={{ backgroundColor: colorType?.primary }}
            >
              <SelectValue
                className="outline-none border-none bg-primary text-white"
                style={{ backgroundColor: colorType?.primary }}
              />
            </SelectTrigger>

            <SelectContent
              className="rounded-b-lg rounded-t-none border-muted-foreground w-full bg-primary border-none"
              style={{ backgroundColor: colorType?.primary }}
            >
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
            <Button
              className="bg-secondary"
              type="submit"
              style={{ backgroundColor: colorType?.secondary }}
            >
              Generate Address
            </Button>
          </div>
        </Form>

        {/* Display the Generated Address */}
        <div className="mt-5">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="address"
            style={descriptionStyle2}
          >
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
                  style={descriptionStyle}
                >
                  <input
                    type="text"
                    value={shortAddress} // Display shortened address
                    readOnly
                    className="w-full bg-transparent text-white text-sm focus:outline-none"
                    style={descriptionStyle}
                  />
                  <button
                    onClick={() => copyToClipboard(subaddress.address)}
                    className="ml-3 text-secondary hover:text-white"
                    style={{ color: colorType?.secondary }}
                  >
                    {copySuccess[subaddress.address] ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            })
          ) : (
            <p
              className="text-muted-foreground text-sm"
              style={descriptionStyle}
            >
              No subaddresses found for this account.
            </p>
          )}
        </div>
      </div>
      {/* Right Side - Tips & Best Practices */}
      <div
        className="w-full md:w-64 bg-third p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h3 className="text-lg font-semibold" style={titleStyle}>
          💡 Tips
        </h3>
        <p
          className="text-sm text-muted-foreground mt-2"
          style={descriptionStyle2}
        >
          Generating a new subaddress for each transaction improves your
          privacy.
        </p>
        <p
          className="text-sm text-muted-foreground mt-2"
          style={descriptionStyle2}
        >
          Share the generated address with the sender only after verifying it.
        </p>
      </div>
    </div>
  );
}
