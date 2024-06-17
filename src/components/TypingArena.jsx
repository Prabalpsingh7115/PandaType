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

  const helper = () => {
    setBlur(false);
  };

  const handleKeyPress = (e) => {
    const curWord = para.current.querySelector(".word.current");
    const curLetter = curWord.querySelector(".letter.current");
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

    if (curWord.getBoundingClientRect().top > 350) {
      const curMargin = parseInt(para.current.style.marginTop || "0px");
      para.current.style.marginTop = curMargin - 36 + "px";
    }

    handleCursor(cursor, para);
  };

  useEffect(() => {
    clearClass(para);
    setWords(getParagraph(mode, value));
    handleCursor(cursor, para);
  }, [mode, value]);

  return (
    <div className={`mx-20 flex h-1/2 flex-col justify-center text-3xl`}>
      <div
        className={`${mode === "time" ? "opacity-100" : "opacity-0"} clock relative left-0 top-0 p-4`}
      >
        {value}
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`${blur ? "opacity-100" : "opacity-0"} relative top-20 flex bg-transparent`}
        >
          {" "}
          Click or press any key to continue!{" "}
        </div>
      </div>

      <div className={`${blur ? "blur-md" : ""} h-[108px] overflow-hidden`}>
        <div
          className={`${blur ? "opacity-0" : "animate-cursor"} cursor absolute left-[78px] h-[36px] w-0.5 bg-slate-200`}
          ref={cursor}
        ></div>
        <div
          className={`flex h-[108px]  flex-wrap gap-x-4 leading-[36px] text-[#71717a] outline-none`}
          ref={para}
          onClick={helper}
          tabIndex="0"
          onKeyDown={handleKeyPress}
        >
          {words.map((word, i) => (
            <div
              className={`${i === 0 ? "current " : ""}word flex h-[36px] gap-x-1`}
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
        className={`${blur ? "opacity-0" : ""} p-10 text-[#71717a] `}
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
