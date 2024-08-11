const getResults =(words)=>{

    const correctWords=words?.current?.querySelectorAll(".word.typed").length;
    const startTime=window.gameStart;
    const curTime= new Date().getTime();
    const timePassed=curTime-startTime;

    const correctLetters=words.current.querySelectorAll(".letter.correct").length
    const incorrectLetters=words.current.querySelectorAll(".letter.incorrect").length
    const extraLetters=words.current.querySelectorAll(".letter.extra").length
    const missedLetters=words.current.querySelectorAll(".letter.missed").length

    const WPM=(correctWords*60000)/timePassed;
    console.log(correctLetters,incorrectLetters,extraLetters,missedLetters)

    return {WPM,correctLetters,incorrectLetters,extraLetters,missedLetters};

}

export default getResults;