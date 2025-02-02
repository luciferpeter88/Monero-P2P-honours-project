import "../style/style.css";
import UserDetails from "../components/UserDetails";
import Card from "../components/Card";
import Account from "../components/Accounts";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";
import TransactionHistory from "../components/Transaction";
import ProfileCard from "../components/ProfileCard";
export default function Index() {
  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg">
        <h3 className="font-medium">Peter Kaszap-Nagy</h3>
        <div className="mt-3 flex gap-x-16 w-full ">
          <UserDetails firstText="Account" lastText="kaszapnagyp@gmail.com" />
          <UserDetails firstText="Phone" lastText="+234 345 678 987" />
          <UserDetails firstText="Accounts" lastText="3" />
          <UserDetails firstText="Current Account" lastText="Primary" />
          <div className="ml-auto mt-auto">
            <button className="items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-2 px-5 text-sm font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98] ml-3">
              Trade
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <div className=" w-max p-5 rounded-lg flex flex-col bg-third">
          <Card />
          <div className="mt-5">
            <button className="inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 h-10 p-5 font-dm text-sm font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
              Create new Account
            </button>
          </div>
        </div>
        <div className="w-full bg-third p-5 rounded-lg">
          <h2 className="text-lg font-semibold">Accounts</h2>
          <div className="mt-5 flex flex-col">
            <Account AccountType="Primary" />
            <Account AccountType="Buisness" />
            <Account AccountType="Hidden Services" />
          </div>
        </div>
      </div>
      <div className=" mt-5 rounded-lg flex h-[55vh] gap-5">
        <div className="w-[75%] h-full bg-third p-5 rounded-lg">
          <Chart />
        </div>
        <div className="w-[35%] bg-third rounded-lg">
          <Chart2 />
        </div>
      </div>
      <div className="bg-third p-5 rounded-lg mt-5 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Market</h2>
        <div className="flex gap-5">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
        <button className="items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-2 px-5 text-sm font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98] mt-5 ml-auto">
          Explore
        </button>
      </div>
      <TransactionHistory />
    </div>
  );
}
