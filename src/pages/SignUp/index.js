import React, { useState } from "react";
import LoginImg from "../../assets/login.jpg";
import SignUpImg from "../../assets/signup.jpg";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../constant";
import { registerUser } from "../../api/api";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
let auth;

const SignUp = ({ mode, setMode, CiDark, CiLight }) => {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLE.NONE); // Default role is set to manufacturer
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!role) {
      errors.role = "Role is required";
    }
    if (Object.keys(errors).length === 0) {
      const newMessage = {
        email,
        password,
        role,
      };
      setMessages([...messages, newMessage]);
      setEmail("");
      setPassword("");
      setRole("");
      registerUser(newMessage)
        .then((response) => {
          console.log(response.data);

          if (response.status === 200) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <React.Fragment>
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
              onClick={() => setMode(!mode)}
            >
              {mode ? <CiDark /> : <CiLight />}
            </button>
            <div className="grid grid-cols-2  h-full w-full med:grid-cols-none ">
              <img
                src={show ? SignUpImg : LoginImg}
                alt=""
                className=" h-full w-11/12 object-contain    med:hidden med:w-0"
              />
              <div className="flex flex-col justify-center items-center w-full h-full pl-5 pr-5 med:d-block med:w-full">
                <div className="w-full h-1/3 flex justify-center items-center">
                  <p className="text-blue-600 text-5xl italic">Registration</p>
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
                        <p className="text-red-500 text-sm">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mb-6">
                    <label
                      htmlFor="role"
                      className={`mb-1 text-xl sm:text-xl tracking-wide ${
                        mode ? "text-white" : "text-gray-600"
                      }`}
                    >
                      Role:
                    </label>
                    <div className="relative h-10">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-11 w-10 text-gray-400">
                        <AiOutlineUsergroupAdd fontSize={25} />
                      </div>
                      <select
                        id="role"
                        type="text"
                        name="role"
                        className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg   w-full py-2.5 focus:outline-none focus:border-blue-700 border-2 ${
                          errors.role ? "border-red-500" : "border-gray-400"
                        }`}
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value={ROLE.NONE}>Choose Role</option>
                        <option value={ROLE.MANUFRACTURER}>Manufacturer</option>
                        <option value={ROLE.TRANSPORTER}>Transporter</option>
                      </select>
                      {errors.role && (
                        <p className="text-red-500 text-sm">{errors.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative flex justify-center mt-4">
                    <button
                      className="text-white text-2xl italic rounded-md border-2 bg-gradient-to-r from-violet-600 to-blue-400 px-10  py-2 hover:bg-gradient-to-l from-blue-600 to-violet-400"
                      type="button"
                      onClick={handleSignUp}
                    >
                      Register
                    </button>
                  </div>
                </form>

                <p
                  className={`text-center text-lg pb-5 ${
                    mode ? "text-white" : "text-gray-600"
                  }`}
                >
                  {show ? "Not a member? " : " Already a member?"}&nbsp;&nbsp;
                  <span
                    className="mb-1 text-xl sm:text-xl tracking-wide cursor-pointer text-indigo-600"
                    onClick={() => navigate("/login")}
                  >
                    {show ? "Signup" : "Login "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
