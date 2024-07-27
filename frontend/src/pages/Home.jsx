import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import ModeBar from "../components/ModeBar";
import TypingArena from "../components/TypingArena";
import pandaIcon from "../assets/icons/panda-icon.png";
import logoutIcon from "../assets/icons/logout.png";
import { UserContext } from "../../context/User";

const Home = () => {
  // const navigate = useNavigate();

  const [mode, setMode] = useState("time");
  const [subModes, setSubModes] = useState([15, 30, 60, 120]);
  const [subMode, setSubMode] = useState(subModes[0]);

  const user = useContext(UserContext);
  console.log(user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.user.username,
            accessToken: undefined,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        user.setUser(null);
        result.accessToken = null;
        // navigate("/auth");
        console.log("Logout successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont">
      <div className="flex h-1/5 w-full items-center justify-between text-2xl text-white">
        <Link to="/">
          <div className="flex items-center justify-center">
            <img
              src={pandaIcon}
              alt="panda-icon"
              className="h-16 w-16 invert "
            />
            <span>PandaType</span>
          </div>
        </Link>
        {user.user ? (
          <div className="flex gap-5">
            {user.user.username}
            <button type="button" onClick={handleLogout}>
              <img src={logoutIcon} alt="logout" className="h-6 w-6 invert " />
            </button>
          </div>
        ) : (
          <div className="login register flex gap-2 text-gray-500 hover:text-gray-100">
            <Link to="/auth">Login </Link>
            <span> / </span>
            <Link to="/auth">Register</Link>
          </div>
        )}
      </div>
      <ModeBar
        mode={mode}
        setMode={setMode}
        subMode={subMode}
        setSubMode={setSubMode}
        subModes={subModes}
        setSubModes={setSubModes}
      />
      <TypingArena mode={mode} value={subMode} />
    </div>
  );
};

export default Home;
