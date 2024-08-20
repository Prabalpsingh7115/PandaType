import { toast } from "react-toastify";

import api from "../api/axios";

const useRegister = () => {
  const handleRegister = async (username, email, password) => {
    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.log("Error:", error.response.data);
    }
  };
  return handleRegister;
};

export default useRegister;
