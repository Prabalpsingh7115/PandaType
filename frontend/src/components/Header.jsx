import { Link } from "react-router-dom";
import { useContext } from "react";

import pandaIcon from "../assets/icons/panda-icon.png";
import logoutIcon from "../assets/icons/logout.png";
import { UserContext } from "../context/User.jsx";
import { GameStateContext } from "../context/GameState.jsx";
import useLogout from "../hooks/useLogout.jsx";

const Header = () => {
  const { user } = useContext(UserContext);
  const { gameState } = useContext(GameStateContext);

  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`${gameState !== "idle" ? "opacity:0" : ""} left-0 top-0 flex h-1/5 w-5/6 items-center justify-between  text-white`}
    >
      <Link to="/">
        <div className="flex items-center justify-center">
          <img src={pandaIcon} alt="panda-icon" className="h-16 w-16 invert " />
          <span>PandaType</span>
        </div>
      </Link>
      {user ? (
        <div className="flex gap-5">
          <Link to="/profile">{user.username}</Link>
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
  );
};

export default Header;
