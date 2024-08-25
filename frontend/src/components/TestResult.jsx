import { useContext } from "react";

import { GameStateContext } from "../context/GameState.jsx";

const TestResult = ({ result }) => {
  const { setGameState, gameType } = useContext(GameStateContext);

  return (
    <div className="results justify center flex w-full flex-col items-center gap-10">
      <h1 className="text-3xl"> Result Page (will update soon) </h1>
      <div className="result flex w-full justify-center gap-4 text-4xl">
        <h1>Speed : </h1>
        <span>{Math.floor(result.WPM) || 0} WPM</span>
      </div>
      <div className="result flex w-full justify-center gap-4 text-4xl">
        <h1>Accuracy : </h1>
        <span>
          {Math.floor(
            (result.correctLetters * 100) /
              (result.correctLetters +
                result.incorrectLetters +
                result.extraLetters +
                result.missedLetters),
          )}{" "}
          %
        </span>
      </div>
      <div className="result flex w-full justify-center gap-4 text-4xl">
        <h1>Characters : </h1>
        <span>
          {result.correctLetters} / {result.incorrectLetters} /
          {result.extraLetters} / {result.missedLetters}
        </span>
      </div>
      {gameType === "compete" && (
        <button
          className={`rounded-lg bg-gray-900 px-3 py-2 text-3xl hover:text-gray-300`}
          onClick={() => {
            setGameState("idle");
          }}
        >
          New Game
        </button>
      )}
    </div>
  );
};

export default TestResult;
