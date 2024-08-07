/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

import { UserContext } from "../context/User.jsx";
import axios from "../api/axios.js";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.post(
          "/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        const decode = jwtDecode(response.data.accessToken);
        setUser((prev) => {
          return {
            ...prev,
            username: decode.username,
            accessToken: response.data.accessToken,
          };
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!user?.accessToken) {
      verifyRefreshToken();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(loading);
    // console.log(user);
  }, [loading]);

  return <>{loading ? <p>Loading....</p> : <Outlet />}</>;
};

export default PersistLogin;
