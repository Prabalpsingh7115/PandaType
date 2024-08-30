import { useContext, useRef } from "react";
import { GameStateContext } from "../context/GameState";
import getResults from "../functions/getResults";
import clearClass from "../functions/clearClass";

const useTimer = () => {
  const clock = useRef();
  const { mode, subMode, gameType, setGameState, setResult, gameState } =
    useContext(GameStateContext);
  const timer = useRef(null);

  const startTimer = async () => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        if (!window.gameStart) {
          window.gameStart = new Date().getTime();
        }

        if (gameState === "finished") {
          clearInterval(timer.current);
          timer.current = null;
          return;
        }

        if (mode === "time") {
          const curTime = new Date().getTime();
          const remTime = Math.round(
            window.gameTime - (curTime - window.gameStart) / 1000,
          );
          if (remTime <= 5) {
            document.querySelector(".clock")?.classList.add("incorrect");
          }

          // console.log(remTime);
          if (remTime <= 0) {
            clearInterval(timer.current);
            gameover();
            return;
          }

          if (document.querySelector(".clock")) {
            document.querySelector(".clock").innerHTML = remTime;
          }
        }
      }, 1000);

      return () => {
        clearInterval(timer.current);
      };
    }
  };

  const gameover = async () => {
    const curResult = getResults(mode, subMode, gameType);
    setResult(curResult);
    clearInterval(timer.current);
    window.gameStart = null;
    setGameState("finished");
    clearClass();
  };

  return { startTimer, gameover, clock };
};

export default useTimer;
