import React, { useState, useEffect } from "react";
import LoginImg from "../../assets/login.jpg";
import SignUpImg from "../../assets/signup.jpg";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constant";
import { loginUser } from "../../api/api";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";

let auth;
const Login = ({ mode, setMode, CiDark, CiLight }) => {
  const { addToast } = useToasts();
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
      const newMessage = {
        email,
        password,
      };
      setMessages([...messages, newMessage]);
      setEmail("");
      setPassword("");
      loginUser(newMessage)
        .then((response) => {
          // console.log(response.data); // Log the response data
          addToast("Login Successfully!", { appearance: "success" });
          if (response.status === 200) {
            const authToken = response.data.token;
            localStorage.setItem(AUTH_TOKEN_KEY, authToken);
            navigate("/account");
          }
        })
        .catch((error) => {
          addToast("Error!", { appearance: "error" });
        });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    auth = localStorage.getItem("auth_token");
    if (auth) {
      navigate("/account");
    }
  }, []);

  return (
    <div
      className={` ${
        mode ? "bg-black" : "bg-white"
      }  w-full h-screen object-contain`}
    >
      <div className="h-screen w-full flex justify-center items-center ">
        <div className={` ${mode ? "bg-dark" : "bg-white"} h-4/5 w-4/5 `}>
          <button
            className={`${
              mode ? " text-white" : "text-black"
            } text-5xl rounded-xl border-solid border-2`}
            onClick={() => {
              setMode(!mode);
              addToast(
                mode
                  ? "Light Mode Enable Successfully!"
                  : "Dark Mode Enable Successfully!",
                { appearance: "success" }
              );
            }}
          >
            {mode ? <CiDark /> : <CiLight />}
          </button>
          <div className="grid grid-cols-2  h-full w-full med:grid-cols-none ">
            <img
              src={show ? LoginImg : SignUpImg}
              alt=""
              className=" h-full w-11/12 object-contain    med:hidden med:w-0"
            />
            <div className="flex flex-col justify-center items-center w-full h-full pl-5 pr-5 med:d-block med:w-full">
              <div className="w-full h-1/3 flex justify-center items-center">
                <p className="text-blue-600 text-5xl italic">Login</p>
              </div>
              <form className="flex flex-col w-full h-full pl-3 pr-3">
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="username"
                    className={`mb-1 text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Email:
                  </label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-11 w-10 text-gray-400">
                      <AiOutlineUser fontSize={25} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg   w-full py-2 focus:outline-none focus:border-blue-700 border-2 ${
                        errors.email ? "border-red-500" : "border-gray-400"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="password"
                    className={`mb-1 text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-11 w-10 text-gray-400">
                      <AiOutlineLock fontSize={25} />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg   w-full py-2 focus:outline-none focus:border-blue-700 border-2 ${
                        errors.password ? "border-red-500" : "border-gray-400"
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="relative flex justify-center mt-6">
                  <button
                    className="text-white text-2xl italic rounded-md border-2 bg-gradient-to-r from-violet-600 to-blue-400 px-10  py-2 hover:bg-gradient-to-l from-blue-600 to-violet-400"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
              <p
                className={`text-center text-lg pb-5 ${
                  mode ? "text-white" : "text-gray-600"
                }`}
              >
                {show ? " Already a member?" : "Not a member? "}&nbsp;&nbsp;
                <span
                  className="mb-1 text-xl sm:text-xl tracking-wide cursor-pointer text-indigo-600"
                  onClick={() => navigate("/")}
                >
                  {show ? "Login" : " Signup"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
