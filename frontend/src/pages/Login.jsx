import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

import pandaImage from "../assets/images/panda-bgg.jpeg";
import userIcon from "../assets/icons/user-icon.png";
import pwdIcon from "../assets/icons/pwd-icon.png";
import pandaIcon from "../assets/icons/panda-icon.png";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center bg-center bg-repeat p-2 text-black  md:flex-row md:p-0"
      style={{ backgroundImage: `url(${pandaImage})` }}
    >
      <div className="login flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-solid border-slate-300 bg-green-50 bg-opacity-90 bg-clip-padding p-10 py-8 text-2xl backdrop-blur-sm backdrop-filter">
        <Link to="/">
          <div className="h- flex  w-full items-center justify-center py-3 font-semibold">
            <img src={pandaIcon} alt="panda-icon" className="h-16 w-16" />
            <span>PandaType</span>
          </div>
        </Link>
        <h2 className="text-2xl">Login</h2>
        <div className="flex w-full items-center justify-center gap-3">
          <img src={userIcon} alt="email-icon" className="w-12" />
          <input
            className="flex rounded-lg border-2 px-3 py-2 text-2xl"
            type="email"
            required
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div className="flex w-full items-center justify-center gap-3">
            <img src={pwdIcon} alt="password-icon" className="w-12" />
            <input
              className="flex rounded-lg border-2 px-3 py-2 text-2xl"
              required
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="relative left-16 text-base">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="hover:text-blue-800 hover:underline"
            >
              {" "}
              Register
            </Link>
          </span>
        </div>
        <div className="py-2">
          <button
            type="button"
            className=" flex rounded-md bg-slate-200 px-12 py-1  shadow-md hover:shadow-xl"
          >
            Sign In
          </button>
        </div>
        <hr className="mx-auto my-4 w-1/2 border-t-2 border-slate-300" />
        <div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
