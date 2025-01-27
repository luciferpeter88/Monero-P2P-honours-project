import React from "react";
import svg from "./components/picture/test.svg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import protection from "./components/picture/Protection.png";
import currency from "./components/picture/Currency.png";
import banking from "./components/picture/Banking.png";
import cashflow from "./components/picture/Cashflow.png";
import Card from "./components/Card";
import "./styles.css";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <React.Fragment>
      {/* <div className="grid grid-cols-8 container mx-auto gap-x-5 px-10 sm:px-0 h-min-screen">
        <div className="col-span-8">
          <Navbar />
        </div>
        <div className="col-span-8 lg:col-span-4 flex flex-col justify-center mt-5">
          <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-medium bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent leading-tight uppercase">
            Trade Monero
          </h1>
          <span className="text-[clamp(1.25rem,4.5vw,2.5rem)] font-medium uppercase leading-tight text-gray-100">
            Securely and Privately
          </span>
          <p className="text-[clamp(1rem,4vw,1.5rem)] leading-tight mt-5 text-gray-50">
            Monero (XMR) is a leading privacy-focused cryptocurrency that uses
            advanced cryptography to ensure your transactions remain
            confidential and secure.
          </p>
          <p className="text-[clamp(1rem,4vw,1.5rem)] leading-tight mt-5 bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent">
            Start trading Monero today and experience true financial freedom.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-3 px-6 w-full md:w-52 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
            Get Started
          </button>
        </div>
        <div className="col-span-8 lg:col-span-4 mt-5">
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
          title="Traiding"
          description="Connect with anyone, anywhere in the world."
        />
        <Card
          src={banking}
          title="Bank-Free"
          description="Trade without banks or intermediaries."
        />
        <Card
          src={cashflow}
          title="Minimal Fees"
          description="Enjoy trading with minimal transaction costs."
        />
        <div className="col-span-8 mt-5">
          <Footer />
        </div>
      </div> */}
      <div className="grid-container container mx-auto px-5">
        <div className="f">
          <Navbar />
        </div>
        <div className="s flex flex-col justify-center mt-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent leading-tight uppercase">
            Trade Monero
          </h1>
          {/* <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase leading-tight text-gray-100 mt-2">
            Securely and Privately
          </span> */}
          <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-tight mt-5 text-gray-50">
            Monero (XMR) is a leading privacy-focused cryptocurrency that uses
            advanced cryptography to ensure your transactions remain
            confidential and secure.
          </p>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-tight mt-5 bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent">
            Start trading Monero today and experience true financial freedom.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-3 px-6 w-full md:w-52 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
            Get Started
          </button>
        </div>
        <div className="sm flex justify-center lg:justify-end mt-10 lg:mt-0">
          <img
            className="w-full h-full max-w-md lg:max-w-lg object-contain"
            src={svg}
            alt="Catalogue-pana"
          />
        </div>
        <div className="c1">
          <Card
            src={protection}
            title="Protected"
            description="Ensuring privacy and security in every trade."
          />
        </div>
        <div className="c2">
          <Card
            src={currency}
            title="Traiding"
            description="Connect with anyone, anywhere in the world."
          />
        </div>
        <div className="c3">
          <Card
            src={banking}
            title="Bank-Free"
            description="Trade without banks or intermediaries."
          />
        </div>
        <div className="c4">
          <Card
            src={cashflow}
            title="Minimal Fees"
            description="Enjoy trading with minimal transaction costs."
          />
        </div>
        <div className="l pt-5">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
