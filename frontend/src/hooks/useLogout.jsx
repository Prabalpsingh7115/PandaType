import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import api from "../api/axios.js";
import { UserContext } from "../context/User.jsx";

const useLogout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (user) {
        await api.post("/logout", {}, { withCredentials: true });
        toast.warn(`Alvida ${user.username}!`);

        // console.log(response);
        await setUser(null);
        Cookies.remove("accessToken");
        navigate("/");
        // console.log("Logout successful");
      }
    } catch (err) {
      toast.error(`${err?.response?.data?.message}`);
      console.log(err);
    }
  };

  return handleLogout;
};

export default useLogout;
