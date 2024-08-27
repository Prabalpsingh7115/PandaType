import { useContext } from "react";

import TestResult from "./TestResult";
import { GameStateContext } from "../context/GameState";

const CompeteResult = () => {
  const { result, opResult } = useContext(GameStateContext);
  return (
    <div className="w-full flex-col items-center justify-center">
      <div className="flex w-full justify-between">
        <div className="my-result flex w-1/2 flex-col items-center justify-center gap-5">
          <div className="text-5xl text-[#cfcfcf] ">My Result</div>
          <TestResult result={result} />
        </div>
        <div className="border-[1px] border-dashed border-accent-color"></div>
        <div className="my-result flex w-1/2 flex-col items-center justify-center gap-5">
          <div className="text-5xl text-[#cfcfcf]">Opp Result</div>
          <TestResult result={opResult} />
        </div>
      </div>
    </div>
  );
};

export default CompeteResult;
