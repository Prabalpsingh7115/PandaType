import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import registerImage from "../assets/images/panda-bgg.jpeg";
import userIcon from "../assets/icons/user-icon.png";
import emailIcon from "../assets/icons/email-icon.png";
import pwdIcon from "../assets/icons/pwd-icon.png";
import pandaIcon from "../assets/icons/panda-icon.png";
import { UserContext } from "../context/User";
import api from "../api/axios";

const Auth = () => {
  const navigate = useNavigate();
  const [rusername, setRusername] = useState("");
  const [lusername, setLusername] = useState("");
  const [email, setEmail] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [lpassword, setLpassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", {
        username: rusername,
        email,
        password: rpassword,
      });
      console.log(response.data);
      setRpassword("");
      setRusername("");
      setEmail("");
      handleLogin();
    } catch (error) {
      console.log("Error:", error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/auth",
        {
          username: lusername || rusername,
          password: lpassword || rpassword,
        },
        { withCredentials: true },
      );

      // console.log(response.data);
      const decode = jwtDecode(response.data.accessToken);
      // console.log(decode);
      await setUser({
        username: decode.username,
        acessToken: response.data.accessToken,
      });
      navigate("/");
      toast(`${decode.username} logged in`);
      // console.log(user);
      setLpassword("");
      setLusername("");
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      // console.log("Error:", error);
    }
  };

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-center bg-repeat"
      style={{ backgroundImage: `url(${registerImage})` }}
    >
      <div className="flex h-2/3 flex-col items-center justify-center rounded-xl border-2 border-solid border-slate-300 bg-green-50 bg-opacity-90 bg-clip-padding px-10 text-2xl text-black  backdrop-blur-sm backdrop-filter">
        <Link to="/">
          <div className="flex w-full items-center justify-center pt-3 text-4xl">
            <img src={pandaIcon} alt="panda-icon" className="h-16 w-16" />
            <span>PandaType</span>
          </div>
          <hr className="mx-auto mb-6 mt-1 w-full border-t-2 border-slate-300" />
        </Link>
        <div className="flex gap-10 ">
          <div className="mt-2 flex h-5/6 flex-col items-center justify-center gap-4">
            <h2 className="text-3xl">Register</h2>
            <div className="flex flex-row gap-3">
              <img src={userIcon} alt="name-icon" className="w-12" />
              <input
                type="text"
                name="rusername"
                value={rusername}
                placeholder="Username"
                onChange={(e) => {
                  setRusername(e.target.value);
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
                  name="rpassword"
                  value={rpassword}
                  placeholder="Password"
                  onChange={(e) => {
                    setRpassword(e.target.value);
                  }}
                  className="rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <button
              className="flex rounded-md bg-slate-200 px-12 py-1  shadow-md hover:shadow-xl"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>

          <div className="login \ flex h-5/6 flex-col items-center justify-center gap-4 rounded-xl">
            <h2 className="text-2xl">Login</h2>
            <div className="flex w-full items-center justify-center gap-3">
              <img src={userIcon} alt="email-icon" className="w-12" />
              <input
                className="flex rounded-lg border-2 px-3 py-2 text-2xl"
                type="email"
                required
                name="lusername"
                value={lusername}
                placeholder="Username"
                onChange={(e) => setLusername(e.target.value)}
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
                  value={lpassword}
                  placeholder="Password"
                  onChange={(e) => setLpassword(e.target.value)}
                />
              </div>
            </div>
            <div className="py-2">
              <button
                type="button"
                className=" flex rounded-md bg-slate-200 px-12 py-1  shadow-md hover:shadow-xl"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
