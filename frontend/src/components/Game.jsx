import ModeBar from "./ModeBar";
import TypingArena from "./TypingArena";

const Game = ({
  mode,
  setMode,
  subModes,
  setSubModes,
  subMode,
  setSubMode,
}) => {
  return (
    <>
      <ModeBar
        mode={mode}
        setMode={setMode}
        subMode={subMode}
        setSubMode={setSubMode}
        subModes={subModes}
        setSubModes={setSubModes}
      />
      <TypingArena mode={mode} value={subMode} />
    </>
  );
};

export default Game;
