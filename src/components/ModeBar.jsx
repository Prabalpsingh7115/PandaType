/* eslint-disable react-hooks/exhaustive-deps */
import getSubModes from "../functions/getSubModes";
import { useEffect } from "react";

const ModeBar = ({
  mode,
  setMode,
  subModes,
  setSubModes,
  subMode,
  setSubMode,
}) => {
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
      className={
        "flex h-10 flex-row items-center justify-center gap-x-5 bg-transparent text-2xl"
      }
    >
      <div className="mode flex flex-row gap-x-5">
        <div
          className={`${mode === "time" ? "text-gray-500 underline " : ""}flex hover:underline-offset-6 cursor-pointer hover:underline`}
          onClick={() => {
            setMode("time");
          }}
        >
          Time
        </div>
        <div
          className={`${mode === "words" ? "text-gray-500 underline " : ""}flex hover:underline-offset-6 cursor-pointer hover:underline`}
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
            className={`${submode == subMode ? "text-gray-500 underline" : ""} underline-offset-6 flex cursor-pointer hover:underline`}
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
