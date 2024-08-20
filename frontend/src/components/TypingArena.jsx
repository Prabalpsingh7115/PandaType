/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState, useRef, useContext } from "react";

import getParagraph from "../functions/getParagraph";
import handleCharacter from "../functions/handleCharacter";
import handleSpace from "../functions/handleSpace";
import handleBackSpace from "../functions/handleBackSpace";
import handleCursor from "../functions/handleCursor";
import clearClass from "../functions/clearClass";
import scrollLines from "../functions/scrollLines";
import getResults from "../functions/getResults";
import { ResultContext } from "../context/Result";
import { GameStateContext } from "../context/GameState";

const TypingArena = () => {
  const { gameState, setGameState, mode, subMode } =
    useContext(GameStateContext);
  const { setResult } = useContext(ResultContext);

  const inputKey = useRef();
  const words = useRef();
  const cursor = useRef();
  const container = useRef();
  const inputF = useRef();
  const clock = useRef();
  const [para, setPara] = useState(getParagraph(mode, subMode));

  window.gameTime = mode === "time" ? subMode : 1000;
  container.current?.focus();

  const gameover = () => {
    setResult(getResults(words));
    clearInterval(window.timer);
    window.gameStart = null;
    window.timer = null;
    setGameState("finished");
  };

  const startTimer = () => {
    if (!window.timer) {
      window.timer = setInterval(() => {
        if (!window.gameStart) {
          window.gameStart = new Date().getTime() - 500;
        }

        if (mode === "time") {
          const curTime = new Date().getTime();
          const remTime =
            window.gameTime - Math.floor((curTime - window.gameStart) / 1000);
          if (remTime <= 5 && clock.current) {
            clock.current.classList.add("incorrect");
          }

          if (remTime <= 0) {
            gameover();
          }

          if (clock && clock.current) {
            clock.current.innerHTML = remTime;
          }
        }
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    invokeFocus();
    setGameState("typing");
    // console.log(e);

    const curWord = words.current.querySelector(".word.current");
    const curLetter = curWord?.querySelector(".letter.current");
    const expectedLetter = curLetter?.innerText || " ";

    inputKey.current = e.nativeEvent.data;
    if (
      e.nativeEvent.inputType === "deleteContentBackward" ||
      e.nativeEvent.inputType === "deleteWordBackward"
    ) {
      inputKey.current = "Backspace";
    }
    // document.getElementById("keypress").innerText = inputKey.current || " ";

    // console.log(words);
    // console.log(curword)
    // console.log(curletter)

    if (inputKey.current?.length === 1 && inputKey.current !== " ") {
      handleCharacter(inputKey.current, curWord, curLetter, expectedLetter);
    }

    if (inputKey.current === " ") {
      handleSpace(curWord, curLetter, expectedLetter);
    }

    if (inputKey.current === "Backspace") {
      const ctrl = e.nativeEvent.inputType === "deleteWordBackward";
      handleBackSpace(ctrl, words, curWord, curLetter);
    }

    scrollLines(container, words, curWord);
    handleCursor(cursor, words);

    const nextWord = words.current.querySelector(".word.current");

    if (
      (curWord === words.current.lastChild &&
        curLetter === curWord.lastChild &&
        curLetter.classList.contains("correct")) ||
      !nextWord
    ) {
      setGameState("finished");
      gameover();
    }
  };

  const invokeFocus = () => {
    if (inputF.current !== document.activeElement) {
      setGameState("typing");
      startTimer();
      inputF.current.focus();
    }
  };

  // const removeFocus = () => {
  //   if (inputF.current === document.activeElement) {
  //     inputF.current.blur();
  //   }
  // };

  useEffect(() => {
    clearClass(words, clock);
    setPara(getParagraph(mode, subMode));
    handleCursor(cursor, words);
    setGameState("idle");
    clearInterval(window.timer);
    window.timer = null;
    window.gameStart = null;
    window.gameTime = subMode;
  }, [mode, subMode]);

  // useEffect(() => {
  //   console.log(document.activeElement);
  // }, [document.activeElement]);

  return (
    <div
      className={`flex h-[24rem] w-5/6 flex-col justify-center gap-3 text-4xl`}
    >
      <div className="mb-8 flex flex-row justify-between">
        <div
          className={`${mode === "time" && gameState === "typing" ? "opacity-100" : "opacity-0"}  clock left-0 top-0 `}
          ref={clock}
        >
          {window.gameTime}
        </div>
      </div>

      <div
        className={`relative flex h-[7.5rem] overflow-hidden  leading-[2.5rem] text-[#71717a] outline-none`}
        ref={container}
        onClick={invokeFocus}
      >
        <input
          type="text"
          className="h-0 w-0"
          ref={inputF}
          onInput={handleKeyPress}
        />
        <div
          className={`${gameState === "idle" ? "hidden" : gameState !== "typing" ? "animate-cursor" : ""} cursor fixed left-0 top-0 z-10 h-[2.5rem] w-0.5  bg-slate-200`}
          ref={cursor}
        ></div>

        <div
          className={`${gameState !== "idle" ? "opacity-100" : "blur-md"} words flex flex-wrap gap-x-4 text-4xl`}
          ref={words}
        >
          {para.map((word, i) => (
            <div className={`${i === 0 ? "current " : ""}word flex`} key={i}>
              {word.split("").map((letter, j) => (
                <div
                  className={`${i === 0 && j === 0 ? "current " : ""}letter`}
                  key={j}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          className={`${gameState !== "idle" ? "hidden" : ""} absolute inset-0 pt-[2.25rem] text-center text-gray-300`}
        >
          Click here or press any key to start!
        </div>
      </div>
      <div id="keypress"></div>

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
