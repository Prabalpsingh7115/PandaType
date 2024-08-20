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
      className={`flex h-[3rem] flex-row items-center justify-center gap-x-5 bg-transparent text-3xl text-gray-500`}
    >
      <div className="mode flex flex-row gap-x-5">
        <div
          className={`${mode === "time" ? "text-gray-100 underline " : "cursor-pointer hover:text-gray-300 "}flex `}
          onClick={() => {
            setMode("time");
          }}
        >
          Time
        </div>
        <div
          className={`${mode === "words" ? "text-gray-100 underline " : " cursor-pointer hover:text-gray-300  "}flex `}
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
            className={`${submode == subMode ? "text-gray-100 underline" : " cursor-pointer hover:text-gray-300"} flex `}
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
