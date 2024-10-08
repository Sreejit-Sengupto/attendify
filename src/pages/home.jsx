import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-tr from-blue-300 to-blue-100">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between p-10">
        <div className="md:w-1/2 text-left flex flex-col items-start">
          <h1 className="text-3xl font-bold text-text mb-4 text-center mx-auto">
            Welcome to Attendify
          </h1>
          <p className="text-gray-600 mb-8 text-center text-sm">
            Attendify is your one-stop solution for effortless student
            attendance management. Our platform leverages the power of QR code
            technology to make attendance marking quick, secure, and
            hassle-free. With just a simple scan, attendance is instantly
            recorded, helping organizations save time and ensure accuracy. Say
            goodbye to outdated manual systems and embrace the future of
            streamlined attendance tracking with Attendify!
          </p>
          <div className="w-full flex justify-center">
            <div className="flex flex-row items-center justify-center gap-2">
              <Link to="/register">
                <button className="bg-primary hover:bg-blue-700 text-white font-bold p-3 rounded-md min-w-[100px]">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-primary hover:bg-blue-700 text-white font-bold p-3 rounded-md min-w-[100px]">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-5 md:mt-0 flex justify-center mx-auto">
          <img
            src="android-chrome-256x256.png"
            alt="Attendify Logo"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
