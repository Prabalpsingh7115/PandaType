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
import Loader from "../components/Loader";
// import { UserContext } from "../context/User";

const Home = () => {
  const {
    gameState,
    setGameState,
    mode,
    subMode,
    setPara,
    setGameType,
    result,
  } = useContext(GameStateContext);
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
    setGameType("practice");
  };

  useEffect(() => {
    fetchPara();
  }, [mode, subMode]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div className="flex h-screen w-5/6 flex-col items-center justify-center overflow-hidden font-customFont text-4xl">
      <div className="fixed top-0 my-5 flex w-full justify-center">
        <Header />
      </div>
      <div className=" flex w-full flex-col items-center justify-around">
        {gameState === "idle" && <ModeBar />}
        {gameState !== "finished" && loading == false && <TypingArena />}
        {loading && <Loader message={"Fetching words"} />}

        {gameState === "idle" && loading === false && (
          <button
            className={`text-3xl hover:text-gray-300 hover:underline`}
            onClick={() => {
              navigate("/compete");
            }}
          >
            Challenge
          </button>
        )}
        {gameState === "finished" && <TestResult result={result} />}
      </div>
    </div>
  );
};

export default Home;
