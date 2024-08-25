/* eslint-disable react-hooks/exhaustive-deps */
import getSubModes from "../functions/getSubModes";
import { useEffect, useContext } from "react";

import { GameStateContext } from "../context/GameState";

const ModeBar = () => {
  const { mode, subModes, subMode, setMode, setSubModes, setSubMode } =
    useContext(GameStateContext);

  useEffect(() => {
    const fetchSubModes = async () => {
      const submodes = getSubModes({ mode });
      setSubModes(submodes);
    };
    fetchSubModes();
  }, [mode]);

  useEffect(() => {
    setSubMode(subModes[0]);
  }, [subModes]);

  return (
    <div
      className={` text-secondary-color flex flex-row items-center justify-center gap-x-5 rounded-[12px] px-5 pt-2 text-[22px]`}
    >
      <div className="mode flex flex-row gap-x-5">
        <div
          className={`${mode === "time" ? "text-accent-color " : "cursor-pointer "}flex `}
          onClick={() => {
            setMode("time");
          }}
        >
          Time
        </div>
        <div
          className={`${mode === "words" ? "text-accent-color  " : " cursor-pointer "}flex `}
          onClick={() => {
            setMode("words");
          }}
        >
          Words
        </div>
      </div>
      <p>|</p>
      <div className="len flex flex-row gap-5">
        {subModes.map((submode) => (
          <div
            className={`${submode == subMode ? "text-accent-color" : " cursor-pointer"} flex `}
            key={submode}
            onClick={() => {
              setSubMode(submode);
            }}
          >
            {submode}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeBar;
