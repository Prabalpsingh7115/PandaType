/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";

import Header from "../components/Header";
import Game from "../components/Game";
import { ComponentContext } from "../context/Component";
import { GameStateContext } from "../context/GameState";

const Home = () => {
  const { component, setComponent } = useContext(ComponentContext);
  const { gameState } = useContext(GameStateContext);
  console.log(gameState);

  useEffect(() => {
    setComponent(<Game />);
  }, []);

  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont">
      <Header />
      {component}
    </div>
  );
};

export default Home;
