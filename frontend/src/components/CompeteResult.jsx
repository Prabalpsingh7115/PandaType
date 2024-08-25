import { useContext } from "react";

import TestResult from "./TestResult";
import { GameStateContext } from "../context/GameState";

const CompeteResult = () => {
  const { result, opResult } = useContext(GameStateContext);
  return (
    <div className="w-full flex-col">
      <div className="flex w-full">
        <div className="my-result flex w-1/2 flex-col items-center justify-center gap-5">
          <div className="text-5xl">My Result</div>
          <TestResult result={result} />
        </div>
        <div className="my-result flex w-1/2 flex-col items-center justify-center gap-5">
          <div className="text-5xl">Opp Result</div>
          <TestResult result={opResult} />
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center">
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
          Rematch
        </button>
      </div>
    </div>
  );
};

export default CompeteResult;
