

const handleBackSpace=(words,curWord,curLetter)=>{

    const invalidateLetter=(letter)=>{

        if(letter.classList.contains("extra"))
        {
            letter.parentNode.removeChild(letter);
        }
        else if(letter.classList.contains('incorrect'))
        {
            letter.classList.remove('incorrect');
        }
        else
        {
            letter.classList.remove('correct');
        }
    }

    if(curWord?.classList?.contains('mistyped'))
    {
        curWord?.classList.remove('mistyped')
    }
    if(curWord?.classList?.contains('typed'))
    {
        curWord?.classList.remove('typed')
    }


    if(!curLetter)
    {
        curWord.lastChild.classList.add('current');
        invalidateLetter(curWord.lastChild);
    }
    else if(curLetter===curWord.firstChild)
    {
        const prevWord=curWord.previousSibling;
        curLetter.classList.remove('current');
        curWord.classList.remove('current');
        prevWord.classList.add('current');
    }
    else 
    {
        curLetter.classList.remove('current');
        curLetter.previousSibling.classList.add('current');
        invalidateLetter(curLetter.previousSibling);
    }

}


export default handleBackSpace;