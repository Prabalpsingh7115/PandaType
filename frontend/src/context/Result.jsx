import { createContext, useState } from "react";

export const ResultContext = createContext(null);

export const ResultProvider = (props) => {
  const [result, setResult] = useState(null);

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {props.children}
    </ResultContext.Provider>
  );
};
