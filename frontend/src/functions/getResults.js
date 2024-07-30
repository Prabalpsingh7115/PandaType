const getResults =(words)=>{

    const correctWords=words?.current?.querySelectorAll(".word.typed").length;
    const startTime=window.gameStart;
    const curTime= new Date().getTime();
    const timePassed=(curTime-startTime)/60000;

    const correctLetters=words.current.querySelectorAll(".letter.correct").length
    const incorrectLetters=words.current.querySelectorAll(".letter.incorrect").length

    const WPM=correctWords/timePassed;
    // console.log(correctWords,timePassed)
    return {WPM,correctLetters,incorrectLetters};

}

export default getResults;