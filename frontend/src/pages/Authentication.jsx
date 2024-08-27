import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import registerImage from "../assets/panda-bgg.jpeg";
import userIcon from "../assets/user-icon.png";
import emailIcon from "../assets/email-icon.png";
import pwdIcon from "../assets/pwd-icon.png";
import logo from "../assets/logo.png";
import { UserContext } from "../context/User";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

const Auth = () => {
  const navigate = useNavigate();
  const [rusername, setRusername] = useState("");
  const [lusername, setLusername] = useState("");
  const [email, setEmail] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [lpassword, setLpassword] = useState("");
  const { user } = useContext(UserContext);
  const login = useLogin();
  const register = useRegister();

  const handleRegister = async () => {
    register(rusername, email, rpassword);
    login(rusername, rpassword);
    clearLfields();
    clearRfields();
  };

  const handleLogin = async () => {
    login(lusername, lpassword);
    clearLfields();
    clearRfields();
  };

  const clearRfields = () => {
    setRpassword("");
    setRusername("");
    setEmail("");
  };

  const clearLfields = () => {
    setLpassword("");
    setLusername("");
  };

  // console.log(user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primary-color bg-center">
      <div className="flex h-2/3 flex-col items-center justify-center rounded-xl border-2 border-solid border-slate-300  px-10 text-2xl text-black ">
        <Link to="/">
          <img src={logo} alt="panda-icon" className="h-36 w-48" />
        </Link>
        <div className="flex gap-10 ">
          <div className="mt-2 flex h-5/6 flex-col items-center justify-center gap-4">
            <h2 className="text-3xl text-secondary-color">Register</h2>
            <div className="flex flex-row gap-3">
              <img src={userIcon} alt="name-icon" className="w-12 invert" />
              <input
                type="text"
                name="rusername"
                value={rusername}
                placeholder="Username"
                onChange={(e) => {
                  setRusername(e.target.value);
                  clearLfields();
                }}
                className="rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-row gap-3">
              <img src={emailIcon} alt="email-icon" className="w-12 invert" />
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email Id"
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearLfields();
                }}
                className="rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-1">
                <img
                  src={pwdIcon}
                  alt="password-icon"
                  className="w-12 invert"
                />
                <input
                  type="password"
                  name="rpassword"
                  value={rpassword}
                  placeholder="Password"
                  onChange={(e) => {
                    setRpassword(e.target.value);
                    clearLfields();
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
            <h2 className="text-2xl text-secondary-color">Login</h2>
            <div className="flex w-full items-center justify-center gap-3">
              <img src={userIcon} alt="email-icon" className="w-12 invert" />
              <input
                className="flex rounded-lg border-2 px-3 py-2 text-2xl"
                type="email"
                required
                name="lusername"
                value={lusername}
                placeholder="Username"
                onChange={(e) => {
                  setLusername(e.target.value);
                  clearRfields();
                }}
              />
            </div>
            <div>
              <div className="flex w-full items-center justify-center gap-3">
                <img
                  src={pwdIcon}
                  alt="password-icon"
                  className="w-12 invert"
                />
                <input
                  className="flex rounded-lg border-2 px-3 py-2 text-2xl"
                  required
                  type="password"
                  name="password"
                  value={lpassword}
                  placeholder="Password"
                  onChange={(e) => {
                    setLpassword(e.target.value);
                    clearRfields();
                  }}
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
