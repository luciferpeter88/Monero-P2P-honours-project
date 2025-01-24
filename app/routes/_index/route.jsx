import React from "react";
import svg from "./components/picture/test.svg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <React.Fragment>
      {/* <div className="h-screen font-[sans-serif] flex flex-col bg-gradient-to-l from-black via-[#181818] to-bg">
        <Navbar />
        <div className="container px-6 py-5 lg:py-0 mx-auto bg-transparent lg:h-full w-full flex">
          <div className="items-center lg:flex justify-between w-full ">
            <div className="w-full lg:w-1/2 lg:mb-16">
              <div className="lg:max-w-2xl">
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
                <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
                  Sign up for free
                </button>
              </div>
            </div>
            <div className="flex justify-center w-full lg:w-1/2 lg:mt-0 ">
              <img
                className="w-full h-full max-w-lg"
                src={svg}
                alt="Catalogue-pana"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_auto_auto_1fr] lg:grid-rows-[auto_1fr_1fr_auto]  min-h-screen container mx-auto px-5 md:px-0">
        <div className="col-span-1 lg:col-span-4">
          <Navbar />
        </div>
        <div className="col-span-1 lg:col-span-2 row-span-2 row-start-2 flex flex-col lg:justify-center justify-start">
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
        <div className="col-span-1 lg:col-span-2 row-span-2 lg:col-start-3 lg:row-start-2 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <img
            className="w-full h-full max-w-lg lg:max-w-xl"
            src={svg}
            alt="Catalogue-pana"
          />
        </div>
        <div className="col-span-1 lg:col-span-4 lg:row-start-4 ">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
