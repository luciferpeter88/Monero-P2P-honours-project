import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export default function Index() {
  // if (typeof window === "undefined") {
  //   console.log("Registration route - running on the server");
  // }
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_1fr_auto_1fr] lg:grid-rows-[auto_1fr_1fr_auto] min-h-screen container mx-auto">
        <div className="col-span-1 lg:col-span-4">
          <Navbar />
        </div>
        <div className="col-span-1 lg:col-span-2 row-span-2 row-start-2 bg-green-500">
          2
        </div>
        <div className="col-span-1 lg:col-span-2 row-span-2 lg:col-start-3 lg:row-start-2 bg-blue-500">
          3
        </div>
        <div className="col-span-1 lg:col-span-4 lg:row-start-4">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
