const handleCharacter=(inputKey,curWord,curLetter,expectedLetter)=>{

    if(inputKey===expectedLetter)
    {
        curLetter?.classList.add("correct"); 
    }
    else
    {
        curLetter?.classList.add("incorrect"); 
    }
    
    if(expectedLetter===' ')
    {
        const extraLetter=document.createElement('div');
        extraLetter.className="letter incorrect extra";
        extraLetter.innerHTML=`${inputKey}`;
        curWord?.appendChild(extraLetter)
    }

    curLetter?.nextSibling?.classList.add("current");
    curLetter?.classList.remove("current");
}


export default handleCharacter;