import api from "../api/axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GameStateContext } from "../context/GameState";

const usePara = () => {
  const navigate = useNavigate();
  const { mode, subMode } = useContext(GameStateContext);

  const getPara = async () => {
    try {
      const response = await api.get(`/para?mode=${mode}&submode=${subMode}`);
      // console.log(response);
      navigate("/");
      console.log(response.data);
      return response.data.para;
    } catch (err) {
      console.log(err);
    }
  };

  return getPara;
};

export default usePara;
