import React from "react";
import svg from "./components/background/home.svg";
import Navbar from "../../components/Navbar";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <React.Fragment>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="container px-6 py-5 lg:py-0 mx-auto bg-primary lg:h-full flex">
          <div className="items-center justify-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-2xl">
                <h1 className="text-6xl font-semibold bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent leading-tight uppercase">
                  Trade Monero
                </h1>
                <span className="text-5xl text-semibold uppercase leading-tight">
                  Securely and Privately
                </span>
                <p className="text-2xl leading-tight mt-5 text-gray-50">
                  Private, decentralized cryptocurrency that keeps your finances
                  confidential and secure.
                </p>
                <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
                  Sign up for free
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full lg:max-w-4xl"
                src={svg}
                alt="Catalogue-pana"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <footer className="bg-primary text-white text-center py-4 min-h-16 border-t-2 border-[#1d1e22] pt-3 w-full px-4">
            foot here
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}
