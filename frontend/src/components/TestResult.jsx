// import { useContext } from "react";

// import { GameStateContext } from "../context/GameState.jsx";
// import clearClass from "../functions/clearClass.js";
// import handleCursor from "../functions/handleCursor.js";
// import delay from "../functions/delay.js";
// import usePara from "../hooks/usePara.jsx";
// import Loader from "./Loader.jsx";

const TestResult = ({ result }) => {
  // const { loading } = useContext(GameStateContext);

  return (
    <div className="results justify center text- flex w-full flex-col items-center gap-10">
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
    </div>
  );
};

export default TestResult;
