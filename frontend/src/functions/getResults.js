const getResults =()=>{

    const words=document.querySelectorAll('.words')
    const correctWords=words[0].querySelectorAll(".word.typed").length;
    const startTime=window.gameStart;
    const curTime= new Date().getTime();
    const timePassed=curTime-startTime;

    const correctLetters=words[0].querySelectorAll(".letter.correct").length
    const incorrectLetters=words[0].querySelectorAll(".letter.incorrect").length
    const extraLetters=words[0].querySelectorAll(".letter.extra").length
    const missedLetters=words[0].querySelectorAll(".letter.missed").length

    const WPM=(correctWords*60000)/timePassed;
    // console.log(correctLetters,incorrectLetters,extraLetters,missedLetters)

    return {WPM,correctLetters,incorrectLetters,extraLetters,missedLetters};

}

export default getResults;