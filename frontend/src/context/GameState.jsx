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
  const [result, setResult] = useState({
    WPM: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    extraLetters: 0,
    missedLetters: 0,
  });
  const [opResult, setOpResult] = useState({
    WPM: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    extraLetters: 0,
    missedLetters: 0,
  });

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
        result,
        setResult,
        opResult,
        setOpResult,
      }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};
