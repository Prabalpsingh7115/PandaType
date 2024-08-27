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
  const getPara = usePara();
  const [loading, setLoading] = useState(true);

  // const { user } = useContext(UserContext);
  // console.log(user);

  const newGame = async () => {
    setLoading(true);
    const data = await getPara();
    setPara(data);
    await delay(500);
    document.getElementById(".container")?.focus();
    setGameState("idle");
    setLoading(false);
  };

  const restart = () => {
    setGameState("starting");
  };

  const fetchPara = async () => {
    setLoading(true);
    const data = await getPara();
    await setPara(data);
    setGameState("idle");
    setGameType("practice");
    setLoading(false);
  };

  useEffect(() => {
    fetchPara();
    // console.log(mode, subMode);
  }, [mode, subMode]);

  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);
  // useEffect(() => {
  //   fetchPara();
  // }, []);

  return (
    <div className="flex h-screen w-5/6 flex-col items-center justify-center overflow-hidden font-customFont text-4xl">
      <div className="fixed top-0 mb-5 flex w-5/6 justify-center">
        <Header />
      </div>
      <div className=" my-5 flex w-full flex-col items-center justify-around">
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
        {gameState === "finished" && loading === false && (
          <TestResult result={result} />
        )}
        {gameState === "finished" && loading === false && (
          <div
            className={`${gameState === "finished" ? "opacity-100" : "opacity-0"} flex w-full justify-center p-5 text-[#71717a] `}
          >
            <button
              className={`px-3 hover:text-gray-300 hover:underline`}
              onClick={restart}
            >
              Restart
            </button>
            <button
              className={`px-3 hover:text-gray-300 hover:underline`}
              onClick={newGame}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
