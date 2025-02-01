import logo from "../../app/pictures/logo.png";
import { Link, useLocation } from "@remix-run/react";
export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/" ? "bg-secondary" : "bg-primary";
  const isContact = pathname === "/contact" ? "bg-secondary" : "bg-primary";
  const isLogin = pathname === "/login" ? "bg-secondary" : "bg-primary";
  const isSignUp = pathname === "/registration" ? "bg-secondary" : "bg-primary";

  return (
    <header className="bg-transparent py-4 h-20">
      <div className=" border-b-2 border-[#1d1e22] mx-auto flex items-center justify-between pb-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-primary hover:text-secondary"
        >
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        {/* Mobile Menu Button (Hidden on larger screens) */}
        <div className="md:hidden">
          <button
            id="menu-toggle"
            className="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Desktop Navigation (Hidden on smaller screens) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-5 z-50">
            <li>
              <Link
                to="/"
                className={` hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors duration-300 ${isHome}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={` hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors duration-300 ${isContact}`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={` hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors duration-300 ${isLogin}`}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="/registration"
                className={` hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors duration-300 ${isSignUp}`}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Mobile Menu (Hidden by default) */}
      <nav
        id="mobile-menu"
        className="hidden md:hidden bg-gray-50 border-t border-gray-200 transition-height duration-300 ease-in-out"
      >
        <ul className="px-4 py-2">
          <li>
            <a href="#" className="block py-2 hover:text-primary">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 hover:text-primary">
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              id="services-dropdown-toggle"
              className="block py-2 hover:text-primary"
            >
              Services
            </a>
            {/* Mobile Dropdown */}
            <ul id="services-dropdown" className="hidden pl-4">
              <li>
                <a href="#" className="block py-2 hover:text-primary">
                  Service 1
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 hover:text-primary">
                  Service 2
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 hover:text-primary">
                  Service 3
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="block py-2 hover:text-primary">
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 bg-primary hover:bg-secondary text-white rounded-md text-center transition-colors duration-300"
            >
              Get Started
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
