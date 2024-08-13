/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let accessToken = Cookies.get("accessToken");
    if (accessToken) {
      let username = jwtDecode(accessToken).username;
      setUser({ username, accessToken });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
