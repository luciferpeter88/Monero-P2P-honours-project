import Card from "../components/Card";

export default function Index() {
  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg">
        <h3 className="font-medium text-xl">Receiving Steps</h3>
        {/* Step Cards */}
        <div className="mt-8 flex justify-between gap-x-5">
          <Card
            step="1"
            header="Select Account"
            body="Choose the account under which you want to generate receiving addresses."
          />
          <Card
            step="2"
            header="Generate Address"
            body="Create a new unique receiving address for this account."
          />
          <Card
            step="3"
            header="Share Address"
            body="Copy and share your Monero address with the sender."
          />
          <Card
            step="4"
            header="Receive & Confirm"
            body="Wait for confirmations and check your account balance."
          />
        </div>
      </div>
    </div>
  );
}
