import { createContext, useState } from "react";

export const GameStateContext = createContext(null);

export const GameStateProvider = (props) => {
  const [gameState, setGameState] = useState("idle");
  const [mode, setMode] = useState("time");
  const [subModes, setSubModes] = useState([15, 30, 60, 120]);
  const [subMode, setSubMode] = useState(subModes[0]);
  const [para, setPara] = useState();

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
        para,
        setPara,
      }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};
