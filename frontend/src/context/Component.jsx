import { createContext, useState } from "react";

export const ComponentContext = createContext(null);

export const ComponentProvider = (props) => {
  const [component, setComponent] = useState(null);

  return (
    <ComponentContext.Provider value={{ component, setComponent }}>
      {props.children}
    </ComponentContext.Provider>
  );
};
