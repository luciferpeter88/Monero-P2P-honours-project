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
        <div className="container px-6 py-10 mx-auto bg-[#141919] lg:h-full flex">
          <div className="items-center justify-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-2xl">
                <h1 className="text-5xl font-semibold bg-gradient-to-r from-orange-50 to-[#FF6F20] bg-clip-text text-transparent leading-tight uppercase">
                  Trade Monero
                </h1>
                <span className="text-5xl text-semibold uppercase leading-tight">
                  Securely and Privately
                </span>
                <p className="text-2xl leading-tight mt-5 text-gray-50">
                  Connect directly with buyers and sellers to trade Monero
                  securely and privately. Start trading your way today!
                </p>
                <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                  Sign up for free
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full lg:max-w-3xl"
                src={svg}
                alt="Catalogue-pana"
              />
            </div>
          </div>
        </div>
        <footer className="bg-[#141919] text-white text-center py-4 min-h-16">
          foot here
        </footer>
      </div>
    </React.Fragment>
  );
}

{
  /* <div className="flex bg-[#141919] h-screen  w-full border-2 border-orange-500 justify-between">
       <nav className="flex justify-between w-full px-6 py-4 shadow max-h-16 bg-slate-50 col-span-2">
         Navbar
       </nav>
       <div className="flex flex-col border-2 border-blue-500">
         <h1 className="text-5xl font-semibold bg-gradient-to-r from-orange-50 to-[#FF6F20] bg-clip-text text-transparent leading-normal uppercase">
           Trade Monero
         </h1>
         <span className="text-4xl text-medium uppercase">
           Securely and Privately
         </span>
         <p className="text-2xl leading-normal mt-5 text-gray-50">
           Connect directly with buyers and sellers to trade Monero securely and
           privately. Our platform ensures a seamless and user-friendly
           experience, giving you full control and unmatched privacy in every
           transaction. Start trading your way today!
         </p>
       </div>
       <div className=" border-2 border-red-500 ">
         <img
           src={svg}
           alt="earth"
           className=" object-contain max-w-[350px] md:max-w-[50rem] w-full flex items-center md:justify-end"
         />
       </div>
     </div> */
}
