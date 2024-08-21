const handleCharacter=(inputKey)=>{

    const curWord=document.querySelector('.word.current');
    const curLetter=document.querySelector('.letter.current');
    const expectedLetter=curLetter?.innerText||' ';
    
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
        const extraLetters=[...curWord.querySelectorAll('.letter.extra')];
        if(extraLetters.length>10)
        {
            return;
        }
        const extraLetter=document.createElement('div');
        extraLetter.className="letter incorrect extra";
        extraLetter.innerHTML=`${inputKey}`;
        curWord?.appendChild(extraLetter)
    }

    curLetter?.nextSibling?.classList.add("current");
    curLetter?.classList.remove("current");
}


export default handleCharacter;