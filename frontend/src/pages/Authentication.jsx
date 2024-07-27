import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import registerImage from "../assets/images/panda-bgg.jpeg";
import userIcon from "../assets/icons/user-icon.png";
import emailIcon from "../assets/icons/email-icon.png";
import pwdIcon from "../assets/icons/pwd-icon.png";
import pandaIcon from "../assets/icons/panda-icon.png";
import { UserContext } from "../../context/User";

const Auth = () => {
  const navigate = useNavigate();
  const [rusername, setRusername] = useState("");
  const [lusername, setLusername] = useState("");
  const [email, setEmail] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [lpassword, setLpassword] = useState("");
  const user = useContext(UserContext);

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: rusername,
            email,
            password: rpassword,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful", data);
        alert(data.message);
        navigate("/auth");
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setRpassword("");
    setRusername("");
    setEmail("");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: lusername, password: lpassword }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        user.setUser({ username: lusername });
        navigate("/");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLpassword("");
    setLusername("");
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