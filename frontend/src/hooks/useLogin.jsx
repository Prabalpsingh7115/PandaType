import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useContext } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../context/User";
import api from "../api/axios";

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post(
        "/auth",
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      // console.log(response.data);
      const decode = jwtDecode(response.data.accessToken);
      // console.log(decode);
      // console.log(response.data);
      Cookies.set("accessToken", response.data.accessToken);
      await setUser({
        username: decode.username,
        accessToken: response.data.accessToken,
      });
      navigate("/");
      toast(`${decode.username} logged in`);
      // console.log(user);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.log("Error:", error);
    }
  };

  return handleLogin;
};

export default useLogin;
