/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ModeBar from "../components/ModeBar";
import TypingArena from "../components/TypingArena";
import TestResult from "../components/TestResult";
import { GameStateContext } from "../context/GameState";
import usePara from "../hooks/usePara";
import delay from "../functions/delay";
// import { UserContext } from "../context/User";

const Home = () => {
  const { gameState, setGameState, mode, subMode, setPara } =
    useContext(GameStateContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const getPara = usePara();

  // const { user } = useContext(UserContext);
  // console.log(user);

  const fetchPara = async () => {
    const data = await getPara();
    setPara(data);
    await delay(1000);
    setLoading(false);
    setGameState("idle");
  };

  useEffect(() => {
    fetchPara();
  }, [mode, subMode]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont text-4xl">
      <Header />
      {gameState !== "finished" && <ModeBar />}
      {gameState !== "finished" && loading == false ? (
        <TypingArena />
      ) : (
        <div className="my-16 text-4xl">loading....</div>
      )}
      {gameState !== "finished" && (
        <button
          className={`text-3xl hover:text-gray-300 hover:underline`}
          onClick={() => {
            navigate("/compete");
          }}
        >
          Challenge
        </button>
      )}
      {gameState === "finished" && <TestResult />}
    </div>
  );
};

export default Home;
