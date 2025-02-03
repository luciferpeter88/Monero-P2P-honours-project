import Card from "../components/Card";
import SendForm from "../components/SendForm";
import SentRecords from "../components/SentRecord";
export default function Index() {
  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg">
        <h3 className="font-medium text-xl">Sending Steps</h3>
        {/* square */}
        <div className="mt-8 flex justify-between gap-x-5">
          <Card
            step="1"
            header="Select Account"
            body=" Select the account you want to send from."
          />
          <Card
            step="2"
            header="Select Amount"
            body=" Select the amount you want to send to."
          />
          <Card
            step="3"
            header="Select Address"
            body=" Select the address you want to send to."
          />
          <Card
            step="4"
            header="Finalize"
            body="Please review and confirm the transaction."
          />
        </div>
      </div>
      <SendForm />
      <SentRecords />
    </div>
  );
}
