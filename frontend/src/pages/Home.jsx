/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";

import Header from "../components/Header";
import ModeBar from "../components/ModeBar";
import TypingArena from "../components/TypingArena";
import TestResult from "../components/TestResult";
import { GameStateContext } from "../context/GameState";

const Home = () => {
  const { gameState } = useContext(GameStateContext);
  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont">
      <Header />
      {gameState !== "finished" && <ModeBar />}
      {gameState !== "finished" && <TypingArena />}
      {gameState === "finished" && <TestResult />}
    </div>
  );
};

export default Home;
