import React from "react";
import "./index.css";
import Image from "../../assets/transport.jpg";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ mode, setMode, CiDark, CiLight }) => {
  const navigate = useNavigate();
  return (
    <div
      className={` ${
        mode ? "bg-black" : "bg-white"
      }  w-full h-screen object-contain`}
    >
      <div className="flex flex-col justify-center items-center w-full h-screen  ">
        <div className="grid gap-x-8 gap-y-4 grid-cols-3   h-16 w-full sml:mb-10 sml:grid gap-x-2 gap-y-4 grid-cols-3 med:grid gap-x-2 gap-y-4 grid-cols-3 ">
          <div className="w-full sml:w-0 sml:w-full  med:w-full med:mb-5"></div>
          <div className="w-full med:d-block med:w-full med:col-span-1 sml:d-block sml:w-full ">
            <p className="w-full flex justify-center items-center ">
              <span
                className={`${
                  mode ? " text-white" : "text-black"
                } text-center  text-3xl italic w-max `}
              >
                Welcome ToDo Notes
              </span>
            </p>
          </div>
          <div className="med:d-block med:w-full sml:row-span-2 sml:w-5">
            <button
              className={`${
                mode ? " text-white" : "text-black"
              } text-5xl rounded-xl border-solid border-2`}
              onClick={() => setMode(!mode)}
            >
              {mode ? <CiDark /> : <CiLight />}
            </button>
          </div>
        </div>
        <img
          src={Image}
          alt=""
          className="w-4/5 h-4/5 md:h-4/5 shadow-2xl  object-cover med:h-1/2 "
        />
        &nbsp;
        <button
          onClick={() => navigate("/signup")}
          className="text-white text-2xl italic rounded-md border-2 bg-gradient-to-r from-violet-600 to-blue-400 px-10  py-2 hover:bg-gradient-to-l from-blue-600 to-violet-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
