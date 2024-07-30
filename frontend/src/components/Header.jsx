import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import pandaIcon from "../assets/icons/panda-icon.png";
import logoutIcon from "../assets/icons/logout.png";
import { UserContext } from "../context/User.jsx";
import api from "../api/axios.js";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout", {
        username: null,
        accessToken: null,
      });
      setUser(null);
      console.log(response);
      navigate("/");
      console.log("Logout successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="left-0 top-0 flex h-1/5 w-full items-center justify-between text-2xl text-white">
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
