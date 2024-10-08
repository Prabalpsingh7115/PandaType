/* eslint-disable react/no-unknown-property */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useContext } from "react";

// import Timer from "./Timer.jsx";
import handleCharacter from "../functions/handleCharacter";
import handleSpace from "../functions/handleSpace";
import handleBackSpace from "../functions/handleBackSpace";
import handleCursor from "../functions/handleCursor";
import handleOpCursor from "../functions/handleOpCursor";
import clearClass from "../functions/clearClass";
import scrollLines from "../functions/scrollLines";
// import getResults from "../functions/getResults";
// import { ResultContext } from "../context/Result";
import { GameStateContext } from "../context/GameState";
import useTimer from "../hooks/useTimer.jsx";

const TypingArena = ({ socket }) => {
  const { gameState, setGameState, mode, subMode, para, gameType, roomID } =
    useContext(GameStateContext);
  // const { setResult } = useContext(ResultContext);
  const inputKey = useRef();
  const words = useRef();
  const cursor = useRef();
  const opCursor = useRef();
  const container = useRef();
  const inputF = useRef();
  const wIdx = useRef(0);
  const lIdx = useRef(0);
  const pos = useRef(null);
  const { startTimer, gameover, clock } = useTimer();

  window.gameTime = mode === "time" ? subMode : 1000;
  container.current?.focus();

  const handleKeyPress = (e) => {
    const Words = [...document.querySelectorAll(".words")[0].children];
    const curWord = words.current.querySelector(".word.current");
    const curLetter = curWord?.querySelector(".letter.current");
    // const expectedLetter = curLetter?.innerText || " ";

    // console.log(Words);
    // console.log(wIdx, lIdx);

    inputKey.current = e.nativeEvent.data;
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      inputKey.current = "Backspace";
    }
    if (e.nativeEvent.inputType === "deleteWordBackward") {
      inputKey.current = "Ctrl + Backspace";
    }

    // document.getElementById("key").innerText = inputKey.current;

    // console.log(words);
    // console.log(curword)
    // console.log(curletter)

    if (inputKey.current?.length === 1 && inputKey.current !== " ") {
      setGameState("playing");
      startTimer();
      handleCharacter(inputKey.current);
    }

    if (inputKey.current === " ") {
      handleSpace();
    }

    if (
      inputKey.current === "Backspace" ||
      inputKey.current === "Ctrl + Backspace"
    ) {
      const ctrl = e.nativeEvent.inputType === "deleteWordBackward";
      handleBackSpace(ctrl, words, curWord, curLetter);
    }

    scrollLines(container, words, curWord);
    wIdx.current = parseInt(
      document.querySelector(".word.current").getAttribute("idx"),
    );
    lIdx.current = parseInt(
      document.querySelector(".letter.current")?.getAttribute("idx"),
    );

    // console.log(wIdx.current, lIdx.current);

    handleCursor(wIdx.current, lIdx.current);

    // const nextWord = words.current.querySelector(".word.current");

    if (wIdx.current === parseInt(Words.length) - 1 && !lIdx.current) {
      setGameState("finished");
      gameover(para, clock);
    }
  };

  const invokeFocus = () => {
    if (inputF.current !== document.activeElement) {
      inputF.current.focus();
    }
    if (gameState === "idle") {
      setGameState("starting");
    }
  };

  const sendCursor = async () => {
    if (!pos.current) {
      pos.current = setInterval(() => {
        if (gameState === "finished") {
          clearInterval(pos.current);
          return;
        }
        // console.log(gameState);
        socket.current.emit(
          "cursor-pos",
          roomID,
          gameState,
          wIdx.current,
          lIdx.current,
        );
      }, 100);

      return () => {
        clearInterval(pos.current);
        pos.current = null;
      };
    }
  };

  useEffect(() => {
    container.current.focus();
    clearClass();
    handleCursor(0, 0);
    handleOpCursor(0, 0);
    clearInterval(window.timer);
    clearInterval(pos.current);
    window.timer = null;
    window.gameStart = null;
    window.gameTime = subMode;
  }, [mode, subMode]);

  useEffect(() => {
    if (gameType === "compete" && gameState === "playing") {
      sendCursor();
    }

    return () => {
      clearInterval(pos.current);
    };
  }, [gameState, gameType]);

  // useEffect(() => {
  //   console.log(document.activeElement);
  // }, [document.activeElement]);

  return (
    <div
      className={`my-5 flex h-[16rem] w-full flex-col justify-start gap-3 text-4xl`}
    >
      <div className="my-2 flex flex-row justify-between text-2xl text-highlight-color">
        <div
          className={`${gameState === "playing" ? "opacity-100" : "opacity-0"}  clock left-0 top-0 `}
          ref={clock}
        >
          {window.gameTime}
        </div>
      </div>

      <div
        className={`container relative flex h-[7.5rem] justify-center overflow-hidden rounded-lg  leading-[2.5rem] text-[#71717a] outline-none`}
        ref={container}
        tabIndex="0"
        onClick={invokeFocus}
        onKeyDown={invokeFocus}
      >
        <input
          type="text"
          className="h-0 w-0"
          ref={inputF}
          onInput={handleKeyPress}
        />
        <div
          className={`${gameState === "idle" ? "hidden" : gameState === "starting" ? "animate-cursor" : ""} cursor correct fixed left-0 top-0 z-10 h-[2.4rem] w-[0.2rem] bg-highlight-color  transition-all duration-200  ease-in-out`}
          ref={cursor}
        ></div>
        <div
          className={`${gameType === "compete" ? (gameState === "playing" ? "" : "") : "hidden"} op-cursor incorrect fixed left-0 top-0 z-10 h-[2.4rem] w-[0.2rem] bg-slate-200 transition-all duration-200  ease-in-out`}
          ref={opCursor}
        ></div>

        <div
          className={`${gameState === "idle" ? "blur-md" : "opacity-100"} words flex flex-wrap gap-x-4 text-4xl`}
          ref={words}
        >
          {para.map((word, i) => (
            <div
              className={`${i === 0 ? "current " : ""}word flex`}
              key={i}
              idx={i}
            >
              {word.split("").map((letter, j) => (
                <div
                  className={`${i === 0 && j === 0 ? "current " : ""}letter`}
                  key={j}
                  idx={j}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          className={`${gameState !== "idle" ? "hidden" : ""} absolute inset-0 pt-[2.25rem] text-center text-2xl text-gray-300`}
        >
          Click here or press any key to start!
        </div>
      </div>
      <div
        className={`${inputKey.current === " " ? "opacity-0 " : " "} flex items-center justify-center`}
      >
        <span id="key" className="h-10 text-red-200 "></span>
      </div>

      {/* <div
        className={`${gameState === "finished" ? "opacity-100" : "opacity-0"} flex w-full justify-center text-[#71717a] `}
      >
        <button
          className={`px-3 hover:text-gray-300 hover:underline`}
          onClick={() => {
            clearClass(words, clock);
            handleCursor(cursor, words);
            setGameState("typing");
            window.gameStart = new Date().getTime();
            container.current?.focus();
          }}
        >
          Restart
        </button>
        <button
          className={`px-3 hover:text-gray-300 hover:underline`}
          onClick={() => {
            clearClass(words, clock);
            setPara(getParagraph(mode, subMode));
            handleCursor(cursor, words);
            container.current?.focus();
            setGameState("idle");
          }}
        >
          New Game
        </button>
      </div> */}
    </div>
  );
};

export default TypingArena;
