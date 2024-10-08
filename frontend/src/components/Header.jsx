import { Link } from "react-router-dom";
import { useContext } from "react";

import logo from "../assets/logo.png";
import logoutIcon from "../assets/logout.png";
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

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <div
      className={`${gameState !== "idle" ? "opacity:0" : ""}  top-5 my-5 flex w-full items-center justify-between text-3xl  text-white`}
    >
      <Link to="/">
        <img src={logo} alt="panda-icon" className=" w-46 h-36" />
      </Link>
      {gameState !== "playing" &&
        (user ? (
          <div className="flex gap-5">
            <Link to="/profile">{user.username}</Link>
            <button type="button" onClick={handleLogout}>
              <img src={logoutIcon} alt="logout" className="h-6 w-6 invert " />
            </button>
          </div>
        ) : (
          <div className="login register flex gap-2 pt-5 text-gray-500 hover:text-gray-100">
            <Link to="/auth">Login </Link>
            <span> / </span>
            <Link to="/auth">Register</Link>
          </div>
        ))}
    </div>
  );
};

export default Header;
