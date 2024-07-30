import { createContext, useState } from "react";

export const GameStateContext = createContext(null);

export const GameStateProvider = (props) => {
  const [gameState, setGameState] = useState("");
  const [mode, setMode] = useState("time");
  const [subModes, setSubModes] = useState([15, 30, 60, 120]);
  const [subMode, setSubMode] = useState(subModes[0]);

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        mode,
        setMode,
        subModes,
        setSubModes,
        subMode,
        setSubMode,
      }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};
