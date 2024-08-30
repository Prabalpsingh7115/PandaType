const getResults =(mode,submode,type)=>{

    const words=document.querySelectorAll('.words')
    const typedWords=[...words[0].querySelectorAll(".word.typed")];
    // console.log(typedWords)

    let ans=0;
    typedWords.forEach(typedWord => {
        const cur=[...typedWord.querySelectorAll('.letter.correct')].length;
        const tot=[...typedWord.querySelectorAll('.letter')].length;
        ans+=cur/tot;
    });
    const startTime=window.gameStart;
    const curTime= new Date().getTime();
    const timePassed=curTime-startTime;

    const correctLetters=words[0].querySelectorAll(".letter.correct").length
    const incorrectLetters=words[0].querySelectorAll(".letter.incorrect").length
    const extraLetters=words[0].querySelectorAll(".letter.extra").length
    const missedLetters=words[0].querySelectorAll(".letter.missed").length

    const WPM=Math.round((ans*60000)/timePassed);
    const accuracy=Math.floor((correctLetters * 100 )/(correctLetters +incorrectLetters +extraLetters +missedLetters));

    // console.log(correctLetters,incorrectLetters,extraLetters,missedLetters)

    return {WPM,correctLetters,incorrectLetters,extraLetters,missedLetters,time:Math.round(timePassed/1000),type,mode,submode,accuracy};

}

export default getResults;