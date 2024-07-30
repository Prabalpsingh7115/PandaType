import { useContext } from "react";

import Game from "./Game";
import { ResultContext } from "../context/Result";
import { ComponentContext } from "../context/Component";

const TestResult = () => {
  const { result } = useContext(ResultContext);
  const { setComponent } = useContext(ComponentContext);

  return (
    <div className="results justify center flex flex-col items-center gap-10">
      <h1 className="text-5xl"> Result Page (will update soon) </h1>
      <div className="result flex w-full justify-center gap-4 text-7xl">
        <h1>Speed : </h1>
        <span>{Math.floor(result.WPM) || 0} WPM</span>
      </div>
      <button
        className={`px-3 hover:text-gray-300 hover:underline`}
        onClick={() => {
          setComponent(<Game />);
        }}
      >
        New Game
      </button>
    </div>
  );
};

export default TestResult;
