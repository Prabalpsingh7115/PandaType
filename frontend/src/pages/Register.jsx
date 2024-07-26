import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import registerImage from "../assets/images/panda-bgg.jpeg";
import userIcon from "../assets/icons/user-icon.png";
import emailIcon from "../assets/icons/email-icon.png";
import pwdIcon from "../assets/icons/pwd-icon.png";
import pandaIcon from "../assets/icons/panda-icon.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-center  bg-repeat"
      style={{ backgroundImage: `url(${registerImage})` }}
    >
      <div className="mt-2 flex flex-col items-center justify-center  gap-4 rounded-xl border-2 border-solid border-slate-300 bg-green-50 bg-opacity-90 bg-clip-padding p-14 py-8 text-2xl text-black backdrop-blur-sm backdrop-filter">
        <Link to="/">
          <div className="h- flex  w-full items-center justify-center py-3 font-bold">
            <img src={pandaIcon} alt="panda-icon" className="h-16 w-16" />
            <span>PandaType</span>
          </div>
        </Link>
        <h2 className="text-2xl">Register</h2>
        <div className="flex flex-row gap-3">
          <img src={userIcon} alt="name-icon" className="w-12" />
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex flex-row gap-3">
          <img src={emailIcon} alt="email-icon" className="w-12" />
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email Id"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-1">
            <img src={pwdIcon} alt="password-icon" className="w-12" />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="rounded-lg px-3 py-2"
            />
          </div>
          <span className="pl-14 text-base">
            {" "}
            Already have an account?{" "}
            <Link to="/login" className="hover:text-blue-500">
              {" "}
              Login{" "}
            </Link>
          </span>
        </div>

        <button className="flex rounded-md bg-slate-200 px-12 py-1  shadow-md hover:shadow-xl">
          Register
        </button>

        <hr className="mx-auto my-4 w-1/2 border-t-2 border-slate-300" />
        <div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
