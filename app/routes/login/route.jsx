import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./style/style.css";
import { Link } from "@remix-run/react";
export default function Index() {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr_1fr] min-h-screen container mx-auto px-5">
        <div className="col-span-1 lg:col-span-4">
          <Navbar />
        </div>
        <div className="col-span-1 lg:col-span-4 row-span-2 row-start-2 flex justify-center items-center overflow-hidden">
          <section className="container-card">
            <div className="login-container">
              <div className="circle circle-one" />
              <div className="form-container">
                <img
                  src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                  alt="illustration"
                  className="illustration"
                />
                <h1 className="opacity mb-8">Sign In</h1>
                <form className="flex flex-col gap-5">
                  <input type="text" placeholder="Username" />
                  <input type="password" placeholder="Password" />
                  <button className="opacity">Log in</button>
                </form>
                <div className="register-forget opacity">
                  <p className="text-white">Don't have an account?</p>
                  <Link to="/registration">Sign Up</Link>
                </div>
              </div>
              <div className="circle circle-two" />
            </div>
            <div className="theme-btn-container" />
          </section>
        </div>

        <div className="col-span-1 lg:col-span-4 lg:row-start-4">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
