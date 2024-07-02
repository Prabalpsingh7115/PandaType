/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState, useRef } from "react";

import getParagraph from "../functions/getParagraph";
import handleCharacter from "../functions/handleCharacter";
import handleSpace from "../functions/handleSpace";
import handleBackSpace from "../functions/handleBackSpace";
import handleCursor from "../functions/handleCursor";
import clearClass from "../functions/clearClass";
import scrollLines from "../functions/scrollLines";
import getSpeed from "../functions/getSpeed";

const TypingArena = ({ mode, value }) => {
  const [para, setPara] = useState(getParagraph(mode, value));
  const [game, setGame] = useState("waiting");
  const inputKey = useRef();
  const words = useRef();
  const cursor = useRef();
  const container = useRef();
  const clock = useRef();

  container.current?.focus();
  window.timer = null;
  window.gameStart = null;
  window.gameTime = value;

  const gameover = () => {
    setGame("over");
    const WPM = getSpeed(words);
    alert(`WPM : ${WPM}`);
    clearInterval(window.timer);
    window.gameStart = null;
  };

  const startTimer = () => {
    if (!window.timer) {
      window.timer = setInterval(() => {
        if (!window.gameStart) {
          window.gameStart = new Date().getTime();
        }

        const curTime = new Date().getTime();
        const remTime = Math.round(
          window.gameTime - (curTime - window.gameStart) / 1000,
        );

        if (mode === "time") {
          if (remTime <= 10) {
            clock.current.classList.add("incorrect");
          }

          if (remTime <= 0) {
            gameover();
          }

          clock.current.innerHTML = remTime;
        }
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (game === "over") {
      return;
    }

    if (game === "waiting") {
      setGame("typing");
      cursor.current.style.left =
        container.current.getBoundingClientRect().left;
      return;
    }

    const curWord = words.current.querySelector(".word.current");
    const curLetter = curWord?.querySelector(".letter.current");
    const expectedLetter = curLetter?.innerText || " ";
    inputKey.current = e.key;

    // console.log(words)
    // console.log(curword)
    // console.log(curletter)

    startTimer();

    if (inputKey.current.length === 1 && inputKey.current !== " ") {
      handleCharacter(inputKey.current, curWord, curLetter, expectedLetter);
    }

    if (inputKey.current === " ") {
      handleSpace(curWord, curLetter, expectedLetter);
    }

    if (inputKey.current === "Backspace") {
      handleBackSpace(curWord, curLetter);
    }

    scrollLines(container, words, curWord);
    handleCursor(cursor, words);
    if (
      curWord === words.current.lastChild &&
      curLetter === curWord.lastChild
    ) {
      gameover();
    }
  };

  useEffect(() => {
    clearClass(words, clock);
    setPara(getParagraph(mode, value));
    handleCursor(cursor, words);
    setGame("waiting");
    window.timer = null;
    window.gameStart = null;
    window.gameTime = { value };
  }, [mode, value]);

  return (
    <div
      className={`flex h-3/5 w-11/12 flex-col justify-center gap-5 text-3xl`}
    >
      <div className="mb-8 flex flex-row justify-between">
        <div
          className={`${mode === "time" ? "opacity-100" : "opacity-0"}  clock left-0 top-0 `}
          ref={clock}
        >
          {window.gameTime}
        </div>
      </div>

      <div
        className={`relative flex h-[6.75rem] overflow-hidden  leading-[2.25rem] text-[#71717a] outline-none`}
        ref={container}
        tabIndex="0"
        onKeyDown={handleKeyPress}
        onClick={() => {
          if (game === "waiting") setGame("typing");
        }}
      >
        <div
          className={`${game === "typing" ? "" : "hidden"} cursor fixed left-0 top-0 z-10 h-[2.25rem] w-0.5 animate-cursor bg-slate-200`}
          ref={cursor}
        ></div>

        <div
          className={`${game === "waiting" ? "blur-sm" : game === "over" ? "opacity-70" : ""} words flex flex-wrap gap-x-2`}
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
          className={`${game === "waiting" ? "" : "hidden"} absolute inset-0 pt-[2.25rem] text-center text-gray-300`}
        >
          Click or press any key to continue!
        </div>
      </div>

      <div
        className={`${game === "waiting" ? "opacity-0" : game === "over" ? "opacity-100" : "opacity-50"} flex w-full justify-center text-[#71717a] `}
      >
        <button
          className={`px-3 hover:text-gray-300 hover:underline`}
          onClick={() => {
            gameover();
            clearClass(words, clock);
            handleCursor(cursor, words);
            setGame("typing");
            container.current?.focus();
            clock.current.innerHTML = window.gameTime;
          }}
        >
          Restart
        </button>
        <button
          className={`px-3 hover:text-gray-300 hover:underline`}
          onClick={() => {
            setPara(getParagraph(mode, value));
            clearClass(words, clock);
            handleCursor(cursor, words);
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default TypingArena;
