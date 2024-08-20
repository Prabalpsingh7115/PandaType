/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ModeBar from "../components/ModeBar";
import TypingArena from "../components/TypingArena";
import TestResult from "../components/TestResult";
import { GameStateContext } from "../context/GameState";
// import { UserContext } from "../context/User";

const Home = () => {
  const { gameState } = useContext(GameStateContext);
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);

  // console.log(user);
  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-hidden font-customFont text-4xl">
      <Header />
      {gameState !== "finished" && <ModeBar />}
      {gameState !== "finished" && <TypingArena />}
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
