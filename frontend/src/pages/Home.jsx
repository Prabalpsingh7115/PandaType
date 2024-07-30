/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";

import Header from "../components/Header";
import Game from "../components/Game";
import { ComponentContext } from "../context/Component";
// import TestResult from "../components/TestResult";

const Home = () => {
  const { component, setComponent } = useContext(ComponentContext);

  const [mode, setMode] = useState("time");
  const [subModes, setSubModes] = useState([15, 30, 60, 120]);
  const [subMode, setSubMode] = useState(subModes[0]);

  useEffect(() => {
    setComponent(
      <Game
        mode={mode}
        setMode={setMode}
        subMode={subMode}
        setSubMode={setSubMode}
        subModes={subModes}
        setSubModes={setSubModes}
      />,
    );
  }, []);
  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont">
      <Header />
      {component}
    </div>
  );
};

export default Home;
