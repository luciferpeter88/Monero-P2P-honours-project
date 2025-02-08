import { useState } from "react";
import { Button } from "../../../../../src/components/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../src/components/components/ui/select";
export default function ReceiveForm() {
  // State for selected account, generated address, loading status, and copy feedback.
  const [selectedAccount, setSelectedAccount] = useState("primary");
  const [generatedAddress, setGeneratedAddress] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Simulate generating a new subaddress (replace with your actual logic)
  const generateAddress = () => {
    setIsGenerating(true);
    // Simulate an asynchronous request
    setTimeout(() => {
      // In a real app, replace this with the real generated address.
      setGeneratedAddress("4A3f2G6mN...exampleSubaddress...");
      setIsGenerating(false);
    }, 1500);
  };

  // Copy the generated address to the clipboard
  const copyToClipboard = () => {
    if (generatedAddress) {
      navigator.clipboard.writeText(generatedAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };
  console.log(selectedAccount);

  return (
    <div className="flex flex-col md:flex-row gap-5 mt-5 text-white">
      {/* Left Side - Interactive Form */}
      <div className="w-full bg-third p-6 rounded-lg shadow-lg">
        <h3 className="text-md font-medium flex items-center gap-2 mb-3">
          <span className="text-blue-500">📁</span> Generate Receiving Address
        </h3>
        {/* Account Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Select Account
          </label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full h-12 rounded-lg sm:ml-auto px-3 border-none outline-none bg-primary text-white focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus:ring-primary focus:ring-offset-primary">
              <SelectValue className="outline-none border-none bg-primary text-white" />
            </SelectTrigger>
            <SelectContent className="rounded-b-lg rounded-t-none border-muted-foreground w-full bg-primary border-none">
              <SelectItem
                value="primary"
                className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
              >
                Primary account
              </SelectItem>
              <SelectItem
                value="business"
                className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
              >
                Buisness
              </SelectItem>
              <SelectItem
                value="hidden"
                className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
              >
                Hidden Services
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Generate Address Button */}
        <div className="mb-5">
          <Button
            onClick={generateAddress}
            disabled={isGenerating}
            className="bg-secondary"
          >
            {isGenerating ? "Generating..." : "Generate Address"}
          </Button>
        </div>
        {/* Display the Generated Address */}
        {generatedAddress && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">
              Your Receiving Address
            </label>
            <div className="flex items-center bg-primary p-3 rounded-md">
              <input
                type="text"
                value={generatedAddress}
                readOnly
                className="w-full bg-transparent text-white text-sm focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="ml-3 text-secondary hover:text-white"
              >
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
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
