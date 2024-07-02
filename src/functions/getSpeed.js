const getSpeed =(words)=>{

    const correctWords=words.current.querySelectorAll(".word.typed").length;
    const startTime=window.gameStart;
    const curTime= new Date().getTime();
    const timePassed=(curTime-startTime)/60000;

    const WPM=Math.round(correctWords/timePassed);
    return WPM;

}

export default getSpeed;