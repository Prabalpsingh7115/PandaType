/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState, useRef } from "react";

import getParagraph from "../functions/getParagraph";
import handleCharacter from "../functions/handleCharacter";
import handleSpace from "../functions/handleSpace";
import handleBackSpace from "../functions/handleBackSpace";
import handleCursor from "../functions/handleCursor";
import clearClass from "../functions/clearClass";

const TypingArena = ({ mode, value }) => {
  const [blur, setBlur] = useState(true);
  const [words, setWords] = useState(getParagraph(mode, value));
  const inputKey = useRef();
  const para = useRef();
  const cursor = useRef();
  const container = useRef();

  const helper = () => {
    setBlur(false);
    handleCursor(cursor, para);
  };

  const handleKeyPress = (e) => {
    const curWord = para.current.querySelector(".word.current");
    const curLetter = curWord?.querySelector(".letter.current");
    const expectedLetter = curLetter?.innerText || " ";
    inputKey.current = e.key;

    // console.log(para)
    // console.log(curword)
    // console.log(curletter)

    if (inputKey.current.length === 1 && inputKey.current !== " ") {
      handleCharacter(inputKey.current, curWord, curLetter, expectedLetter);
    }

    if (inputKey.current === " ") {
      handleSpace(curWord, curLetter, expectedLetter);
    }

    if (inputKey.current === "Backspace") {
      handleBackSpace(curWord, curLetter);
    }

    if (
      curWord.getBoundingClientRect().bottom + 16 >=
      container.current.getBoundingClientRect().bottom
    ) {
      const curMargin = parseInt(para.current.style.marginTop || "0rem");
      para.current.style.marginTop = `${curMargin - 2.75}rem`;
    }

    handleCursor(cursor, para);
  };

  useEffect(() => {
    clearClass(para);
    setWords(getParagraph(mode, value));
    handleCursor(cursor, para);
  }, [mode, value]);

  return (
    <div className={`flex h-3/5 w-4/5 flex-col justify-center text-3xl`}>
      <div className="flex flex-row justify-between">
        <div
          className={`${mode === "time" ? "opacity-100" : "opacity-0"} clock  left-0 top-0 `}
        >
          {value}
        </div>
        <button className="text-[#71717a]"> New Game</button>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`${blur ? "opacity-100" : "opacity-0"} relative top-20 flex bg-transparent`}
        >
          {" "}
          Click or press any key to continue!{" "}
        </div>
      </div>

      <div
        className={`${blur ? "blur-md" : ""} h-[6.75rem] overflow-hidden`}
        ref={container}
      >
        <div
          className={`${blur ? "opacity-0" : "animate-cursor"} cursor absolute h-[2.25rem] w-0.5 bg-slate-200`}
          ref={cursor}
        ></div>
        <div
          className={`flex h-[6.75rem] flex-wrap gap-x-4 leading-[2.25rem] text-[#71717a] outline-none`}
          ref={para}
          onClick={helper}
          tabIndex="0"
          onKeyDown={handleKeyPress}
        >
          {words.map((word, i) => (
            <div
              className={`${i === 0 ? "current " : ""}word flex  gap-x-1`}
              key={i}
            >
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
      </div>

      <button
        className={`${blur ? "opacity-0" : ""} mt-5 text-[#71717a] `}
        onClick={() => {
          clearClass(para);
          handleCursor(cursor, para);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default TypingArena;
