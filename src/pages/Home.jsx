import { Link } from "react-router-dom";
import { useState } from "react";

import ModeBar from "../components/ModeBar";
import TypingArena from "../components/TypingArena";

import pandaIcon from "../assets/icons/panda-icon.png";

const Home = () => {
  const [mode, setMode] = useState("time");
  const [subModes, setSubModes] = useState([15, 30, 60, 120]);
  const [subMode, setSubMode] = useState(subModes[0]);

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-hidden  font-customFont">
      <div className="flex h-1/5 w-full items-center justify-between px-10 py-5 text-2xl text-white">
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
        <div className="login register flex gap-2 ">
          <Link to="/login">Login </Link>
          <span> / </span>
          <Link to="/register">Register</Link>
        </div>
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
