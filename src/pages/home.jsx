import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between p-20">
        <div className="md:w-1/2 text-left flex flex-col items-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Attendify</h1>
          <p className="text-gray-600 mb-8">
            Attendify is your one-stop solution for effortless student attendance management. 
            Our platform leverages the power of QR code technology to make attendance marking 
            quick, secure, and hassle-free. With just a simple scan, attendance is instantly 
            recorded, helping organizations save time and ensure accuracy. Say goodbye to outdated 
            manual systems and embrace the future of streamlined attendance tracking with Attendify!
          </p>
          <div className="w-full flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <button
                  style={{ backgroundColor: '#dddbff' }}
                  className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button
                  style={{ backgroundColor: '#dddbff' }}
                  className="hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="android-chrome-256x256.png" 
            alt="Attendify Logo"
            className="w-64 h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
