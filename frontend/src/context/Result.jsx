import { createContext, useState } from "react";

export const ResultContext = createContext(null);

export const ResultProvider = (props) => {
  const [result, setResult] = useState({
    WPM: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    extraLetters: 0,
    missedLetters: 0,
  });

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {props.children}
    </ResultContext.Provider>
  );
};
