import { createContext, useState } from "react";

export const GameStateContext = createContext(null);

export const GameStateProvider = (props) => {
  const [gameState, setGameState] = useState("idle");
  const [gameType, setGameType] = useState("practice");
  const [mode, setMode] = useState("time");
  const [subModes, setSubModes] = useState([15, 30, 60, 120]);
  const [subMode, setSubMode] = useState(subModes[1]);
  const [para, setPara] = useState();
  const [roomID, setRoomID] = useState(null);

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
        gameType,
        setGameType,
        roomID,
        setRoomID,
      }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};
