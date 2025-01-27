import React from "react";
import svg from "./components/picture/test.svg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import protection from "./components/picture/protection.png";
import currency from "./components/picture/Currency.png";
import banking from "./components/picture/Banking.png";
import cashflow from "./components/picture/Cashflow.png";
import Card from "./components/Card";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <React.Fragment>
      <div className="grid grid-cols-8 container mx-auto gap-y-5 gap-x-5 px-10 sm:px-0">
        <div className="col-span-8">
          <Navbar />
        </div>
        <div className="col-span-4 flex flex-col justify-center  z-10">
          <h1 className="text-5xl font-medium bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent leading-tight uppercase">
            Trade Monero
          </h1>
          <span className="text-5xl font-medium  uppercase leading-tight">
            Securely and Privately
          </span>
          <p className="text-2xl leading-tight mt-5 text-gray-50">
            Private, decentralized cryptocurrency that keeps your finances
            confidential and secure.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-3 px-6 w-52 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
            Sign up for free
          </button>
        </div>
        <div className="col-span-4">
          <div className="col-span-1 lg:col-span-2 row-span-2 lg:col-start-3 lg:row-start-2 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <img
              className="w-full h-full max-w-lg lg:max-w-lg object-contain"
              src={svg}
              alt="Catalogue-pana"
            />
          </div>
        </div>
        <Card
          src={protection}
          title="Protected"
          description="Ensuring privacy and security in every trade."
        />
        <Card
          src={currency}
          title="Protected"
          description="Ensuring privacy and security in every trade."
        />
        <Card
          src={banking}
          title="Protected"
          description="Ensuring privacy and security in every trade."
        />
        <Card
          src={cashflow}
          title="Protected"
          description="Ensuring privacy and security in every trade."
        />
      </div>
      <div className="col-span-8 h-full">
        <Footer />
      </div>
    </React.Fragment>
  );
}
